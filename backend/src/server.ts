import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
// import path from 'path';
import { GameManager } from './gameManagement/GameManager';

const app = express();
const PORT = process.env.PORT || 3001;
const server = createServer(app);

const gameManager = new GameManager();

/**
 * Socket.IO server instance.
 * Attached to the HTTP server to enable real-time, bidirectional communication
 * between the server and connected clients.
 */
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

app.use(cors());
app.use(express.json());

/**
 * HTTP GET route handler for the root path ('/').
 * Responds to standard HTTP requests to the server's base URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
app.get('/', (req, res) => {
  res.send('Ping Pong Server is running!');
});

/**
 * Socket.IO 'connection' event listener.
 * This callback function is executed whenever a new client successfully
 * establishes a Socket.IO connection with the server.
 * @param socket - The individual Socket.IO socket representing the client's connection.
 */
io.on('connection', (socket) => {
  socket.on('createGame', (playerName: string) => {
    const gameId = gameManager.createGame();
    const addPlayerResult = gameManager.getGame(gameId)?.addPlayer(socket.id);

    if (addPlayerResult?.success) {
      socket.join(gameId);
      socket.emit('gameCreated', { gameId, playerNumber: addPlayerResult.playerNumber, playerName });
      gameManager.playerGameMap.set(socket.id, gameId);
      gameManager.startGameLoop(gameId, io);
    } else {
      socket.emit('error', { message: addPlayerResult?.error || "Failed to create and join game." });
      console.error(`Error for ${socket.id} (${playerName}) creating game: ${addPlayerResult?.error || "Unknown error during creation."}`);
    }
  });

  /**
   * Socket.IO 'joinGame' event listener.
   * Handles requests from clients to join an existing game session.
   * @param gameId - The ID of the game to join.
   * @param playerName - The name of the player joining the game.
   */
  socket.on('joinGame', (gameId: string, playerName: string) => {
    const joinResult = gameManager.joinGame(gameId, socket.id);

    if (joinResult.success) {
      socket.join(gameId);
      /**
       * Emits a 'joinedGame' event back to the joining client upon successful join.
       * @param data - An object containing:
       * - gameId: The ID of the game joined.
       * - playerNumber: The player number assigned to the joining player.
       * - playerName: The name of the player.
       */
      socket.emit('joinedGame', { gameId, playerNumber: joinResult.playerNumber, playerName });
      /**
       * Emits a 'playerJoinedRoom' event to all other clients already in the game room.
       * This notifies existing players that a new player has joined.
       * @param data - An object containing:
       * - playerId: The Socket.IO ID of the newly joined player.
       * - playerNumber: The player number assigned to the new player.
       * - playerName: The name of the new player.
       */
      socket.to(gameId).emit('playerJoinedRoom', { playerId: socket.id, playerNumber: joinResult.playerNumber, playerName });

      const game = gameManager.getGame(gameId);
      if (game) {
          socket.emit('gameState', game.getGameState());
      }
    } else {
      /**
       * Emits an 'error' event back to the client if joining the game fails.
       * @param data - An object containing:
       * - message: A descriptive error message.
       */
      socket.emit('error', { message: joinResult.error });
      console.error(`Player ${socket.id} (${playerName}) failed to join game ${gameId}: ${joinResult.error}`);
    }
  });

  /**
   * Socket.IO 'paddleMove' event listener.
   * Handles requests from clients to move their respective paddles.
   * @param data - An object containing:
   * - gameId: The ID of the game where the paddle movement occurred.
   * - deltaY: The vertical displacement for the paddle (positive for down, negative for up).
   */
  socket.on('paddleMove', (data: { gameId: string, deltaY: number }) => {
    const { gameId, deltaY } = data;
    const game = gameManager.getGame(gameId);

    if (!game) {
      return;
    }

    let playerNumber: 1 | 2 | undefined;
    for (const [id, num] of game.players.entries()) {
      if (id === socket.id) {
        playerNumber = num;
        break;
      }
    }

    if (playerNumber) {
      game.movePaddle(playerNumber, deltaY);
      io.to(gameId).emit('gameState', game.getGameState());
    }
  });

  /**
   * Socket.IO 'disconnect' event listener.
   * Handles client disconnections.
   * Calls GameManager to update game state and potentially stop the game loop
   * if the disconnected player was the last one in a game.
   */
  socket.on('disconnect', () => {
    gameManager.stopGameLoopIfGameEmpty(socket.id);
  });
});

/**
 * Starts the HTTP server.
 * The server listens for incoming HTTP requests and Socket.IO WebSocket connections
 * on the specified PORT.
 */
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});