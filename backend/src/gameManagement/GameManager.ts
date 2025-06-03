import { v4 as uuidv4 } from 'uuid';
import { Game } from '../game/Game';
import { Server } from 'socket.io';


interface JoinResult {
  success: boolean;
  error?: string;
  playerNumber?: 1 | 2;
}

export class GameManager {
  private games: Map<string, Game> = new Map();
  private activeGameLoops: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    console.log("GameManager initialized");
  }

  createGame(): string {
    const gameId = uuidv4();
    const newGame = new Game(gameId);
    this.games.set(gameId, newGame);
    console.log(`New game created with ID: ${gameId}`);
    return gameId;
  }

  joinGame(gameId: string, playerId: string): JoinResult {
    const game = this.games.get(gameId);

    if (!game) {
      console.log(`Attempted to join non-existent game: ${gameId} by ${playerId}`);
      return { success: false, error: "Game not found." };
    }

    if (game.players.has(playerId)) {
        console.log(`Player ${playerId} is already in game ${gameId}`);
        return { success: false, error: "Player already in this game." };
    }

    const addPlayerResult = game.addPlayer(playerId);
    if (!addPlayerResult.success) {
        console.log(`Failed to add player ${playerId} to game ${gameId}: ${addPlayerResult.error}`);
        return { success: false, error: addPlayerResult.error };
    }

    console.log(`Player ${playerId} joined game ${gameId} as Player ${addPlayerResult.playerNumber}`);
    return { success: true, playerNumber: addPlayerResult.playerNumber };
  }
  
  getGame(gameId: string): Game | undefined {
      return this.games.get(gameId);
  }

  removeGame(gameId: string): boolean {
      const gameRemoved = this.games.delete(gameId);
      if (gameRemoved) {
          this.stopGameLoop(gameId);
      }
      return gameRemoved;
  }

  startGameLoop(gameId: string, ioInstance: Server) {
      const game = this.games.get(gameId);
      if (!game || this.activeGameLoops.has(gameId)) {
          return; 
      }

      const gameLoopInterval = setInterval(() => {
          game.updateBall(1);
          const gameState = game.getGameState();
          ioInstance.to(gameId).emit('gameState', gameState);
      }, 1000 / 60);

      this.activeGameLoops.set(gameId, gameLoopInterval);
      console.log(`Game loop started for game: ${gameId}`);
  }

  stopGameLoop(gameId: string) {
      const interval = this.activeGameLoops.get(gameId);
      if (interval) {
          clearInterval(interval);
          this.activeGameLoops.delete(gameId);
          console.log(`Game loop stopped for game: ${gameId}`);
      }
  }
}