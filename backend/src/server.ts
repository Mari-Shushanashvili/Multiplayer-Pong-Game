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

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ping Pong Server is running!');
});

io.on('connection', (socket) => {

  socket.on('createGame', (playerName: string) => {
    const gameId = gameManager.createGame();
    const addPlayerResult = gameManager.getGame(gameId)?.addPlayer(socket.id);

    if (addPlayerResult?.success) {
        socket.join(gameId);
        socket.emit('gameCreated', { gameId, playerNumber: addPlayerResult.playerNumber, playerName });
    } else {
        socket.emit('error', { message: addPlayerResult?.error || "Failed to create and join game." });
        console.error(`Error for ${socket.id} (${playerName}) creating game: ${addPlayerResult?.error || "Unknown error during creation."}`); // Keep error logs for debugging
    }
  });

  socket.on('joinGame', (gameId: string, playerName: string) => {
    const joinResult = gameManager.joinGame(gameId, socket.id);

    if (joinResult.success) {
      socket.join(gameId);
      socket.emit('joinedGame', { gameId, playerNumber: joinResult.playerNumber, playerName });
      socket.to(gameId).emit('playerJoinedRoom', { playerId: socket.id, playerNumber: joinResult.playerNumber, playerName });
    } else {
      socket.emit('error', { message: joinResult.error });
      console.error(`Player ${socket.id} (${playerName}) failed to join game ${gameId}: ${joinResult.error}`);
    }
  });

  socket.on('disconnect', () => {
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});