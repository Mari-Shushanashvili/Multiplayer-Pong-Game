import { v4 as uuidv4 } from 'uuid';
import { Game } from '../game/Game'; // Import the real Game class
import { Server } from 'socket.io'; // Import Socket.IO Server type for startGameLoop

// // --- TEMPORARY PLACEHOLDER FOR GAME CLASS (WILL BE REPLACED LATER IN CHUNK 2.4) ---
// // Note: This Game class has debug logs added for troubleshooting player assignment
// class Game {
//     id: string;
//     players: Map<string, 1 | 2> = new Map(); // Socket ID to player number

//     constructor(gameId: string) {
//         this.id = gameId;
//         console.log(`Placeholder Game ${this.id} created.`); // Debug log
//     }

//     addPlayer(playerId: string): { success: boolean, playerNumber?: 1 | 2, error?: string } {
//         console.log(`Attempting to add player ${playerId} to game ${this.id}. Current players size: ${this.players.size}`); // DEBUG LOG

//         if (this.players.size >= 2) { // Checks if already 2 players
//             console.log(`Game ${this.id} is full. Player ${playerId} rejected.`); // DEBUG LOG
//             return { success: false, error: "Game is full" };
//         }
//         if (this.players.has(playerId)) { // Check if player is already added
//             console.log(`Player ${playerId} already in game ${this.id}.`); // DEBUG LOG
//             return { success: false, error: "Player already in this game." };
//         }
        
//         const playerNumber: 1 | 2 = (this.players.size === 0) ? 1 : 2; 
//         this.players.set(playerId, playerNumber); 
        
//         console.log(`Game ${this.id}: Player ${playerId} successfully added as Player ${playerNumber}. New players size: ${this.players.size}`); // DEBUG LOG

//         // If player 2 joins, start the game (this logic is relevant for GameState status)
//         if (this.players.size === 2) {
//             // This is where the game status is set to 'playing'
//             // Assumes GameState is initialized and accessible via a private property 'gameState' in the Game class.
//             // For this placeholder, we don't have gameState yet, so this won't actually set it.
//             // The real Game class will correctly update its gameState.status.
//         }

//         return { success: true, playerNumber };
//     }

//     getPlayersCount(): number {
//         return this.players.size;
//     }

//     // These methods would normally be in the real Game.ts
//     // Placeholder to satisfy GameManager
//     getGameState(): any { 
//         return { ballX: 0, ballY: 0, player1PaddleY: 0, player2PaddleY: 0, status: 'waiting' }; 
//     }
//     updateBall(deltaTime: number = 1) { /* Placeholder */ }
// }
// // --- END TEMPORARY PLACEHOLDER ---


interface JoinResult {
  success: boolean;
  error?: string;
  playerNumber?: 1 | 2;
}

export class GameManager {
  private games: Map<string, Game> = new Map();
  private activeGameLoops: Map<string, NodeJS.Timeout> = new Map(); // Stores setInterval IDs

  constructor() {
    console.log("GameManager initialized"); // Debug log
  }

  createGame(): string {
    const gameId = uuidv4();
    const newGame = new Game(gameId);
    this.games.set(gameId, newGame);
    console.log(`New game created with ID: ${gameId}`); // Debug log
    return gameId;
  }

  joinGame(gameId: string, playerId: string): JoinResult {
    const game = this.games.get(gameId);

    if (!game) {
      console.log(`Attempted to join non-existent game: ${gameId} by ${playerId}`); // Debug log
      return { success: false, error: "Game not found." };
    }

    if (game.players.has(playerId)) {
        console.log(`Player ${playerId} is already in game ${gameId}`); // Debug log
        return { success: false, error: "Player already in this game." };
    }

    const addPlayerResult = game.addPlayer(playerId);
    if (!addPlayerResult.success) {
        console.log(`Failed to add player ${playerId} to game ${gameId}: ${addPlayerResult.error}`); // Debug log
        return { success: false, error: addPlayerResult.error };
    }

    console.log(`Player ${playerId} joined game ${gameId} as Player ${addPlayerResult.playerNumber}`); // Debug log
    return { success: true, playerNumber: addPlayerResult.playerNumber };
  }
  
  getGame(gameId: string): Game | undefined {
      return this.games.get(gameId);
  }

  removeGame(gameId: string): boolean {
      const gameRemoved = this.games.delete(gameId);
      if (gameRemoved) {
          this.stopGameLoop(gameId); // Stop loop if game is removed
      }
      return gameRemoved;
  }

  // Method to start the game loop for a specific game
  startGameLoop(gameId: string, ioInstance: Server) { // ioInstance needed for broadcasting
      const game = this.games.get(gameId);
      // Ensure game exists and loop isn't already active
      if (!game || this.activeGameLoops.has(gameId)) {
          return; 
      }

      const gameLoopInterval = setInterval(() => {
          // Only update ball if game is actually playing (2 players joined)
          // The Game class's updateBall already checks game.gameState.status
          game.updateBall(1); // Update ball position (deltaTime = 1 for now)
          const gameState = game.getGameState();
          ioInstance.to(gameId).emit('gameState', gameState); // Emit updated state to all clients in this room
      }, 1000 / 60); // Roughly 60 updates per second (1000ms / 60 frames)

      this.activeGameLoops.set(gameId, gameLoopInterval);
      console.log(`Game loop started for game: ${gameId}`); // Debug log
  }

  // Method to stop the game loop for a specific game
  stopGameLoop(gameId: string) {
      const interval = this.activeGameLoops.get(gameId);
      if (interval) {
          clearInterval(interval);
          this.activeGameLoops.delete(gameId);
          console.log(`Game loop stopped for game: ${gameId}`); // Debug log
      }
  }
}