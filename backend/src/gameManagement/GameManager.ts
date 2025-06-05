import { v4 as uuidv4 } from 'uuid';
import { Game, PADDLE_SPEED } from '../game/Game';
import { Server } from 'socket.io';

/**
 * Interface defining the structure of the result when a player attempts to join a game.
 */
interface JoinResult {
  success: boolean;
  error?: string;
  playerNumber?: 1 | 2;
}

/**
 * Manages multiple active game sessions.
 * Responsible for creating, joining, and tracking the lifecycle of Pong games.
 */
export class GameManager {
  private games: Map<string, Game> = new Map();
  private activeGameLoops: Map<string, NodeJS.Timeout> = new Map();
  public playerGameMap: Map<string, string> = new Map();

  constructor() {
  }

  /**
   * Creates a new game session.
   * @returns The unique ID of the newly created game.
   */
  createGame(): string {
    const gameId = uuidv4();
    const newGame = new Game(gameId);
    this.games.set(gameId, newGame);
    return gameId;
  }

  /**
   * Attempts to add a player to a specified game session.
   * @param gameId - The ID of the game to join.
   * @param playerId - The unique identifier of the player (typically Socket.IO socket.id).
   * @returns A JoinResult indicating success or failure, and the assigned player number.
   */
  joinGame(gameId: string, playerId: string): JoinResult {
    const game = this.games.get(gameId);

    if (!game) {
      return { success: false, error: "Game not found." };
    }

    if (game.players.has(playerId)) {
        return { success: false, error: "Player already in this game." };
    }

    const addPlayerResult = game.addPlayer(playerId);
    if (!addPlayerResult.success) {
        return { success: false, error: addPlayerResult.error };
    }

    this.playerGameMap.set(playerId, gameId);
    return { success: true, playerNumber: addPlayerResult.playerNumber };
  }
  
  getGame(gameId: string): Game | undefined {
      return this.games.get(gameId);
  }

  /**
   * Removes a game session from the manager.
   * Also stops its associated game loop and removes players from tracking maps.
   * @param gameId - The ID of the game to remove.
   * @returns True if the game was removed, false otherwise.
   */
  removeGame(gameId: string): boolean {
      const gameRemoved = this.games.delete(gameId);
      if (gameRemoved) {
          this.stopGameLoop(gameId);
          for (const [playerId, mapGameId] of this.playerGameMap.entries()) {
              if (mapGameId === gameId) {
                  this.playerGameMap.delete(playerId);
              }
          }
      }
      return gameRemoved;
  }

  /**
   * Starts the continuous game loop for a specific game session.
   * The loop periodically updates the game state and broadcasts it to clients.
   * @param gameId - The ID of the game to start the loop for.
   * @param ioInstance - The Socket.IO server instance for broadcasting.
   */
  startGameLoop(gameId: string, ioInstance: Server) {
      const game = this.games.get(gameId);
      if (!game || this.activeGameLoops.has(gameId)) {
          console.error(`Attempted to start loop for game ${gameId} but it's not found or already active.`); // Debug log
          return; 
      }

      let lastUpdateTime = Date.now();

      const gameLoopInterval = setInterval(() => {
      game.updateBall(1);

      const gameState = game.getGameState();
      ioInstance.to(gameId).emit('gameState', gameState);
}, 1000 / 60);

      this.activeGameLoops.set(gameId, gameLoopInterval);
      console.log(`Game loop started for game: ${gameId}`);
  }

  /**
   * Stops the game loop for a specific game session.
   * @param gameId - The ID of the game whose loop to stop.
   */
  stopGameLoop(gameId: string) {
      const interval = this.activeGameLoops.get(gameId);
      if (interval) {
          clearInterval(interval);
          this.activeGameLoops.delete(gameId);
          console.log(`Game loop stopped for game: ${gameId}`); // Debug log
      }
  }

  /**
   * Handles player disconnections.
   * Removes the player from their game and stops the game loop if the game becomes empty.
   * @param playerId - The Socket.IO ID of the disconnected player.
   */
  stopGameLoopIfGameEmpty(playerId: string) {
      const gameId = this.playerGameMap.get(playerId);
      if (gameId) {
          const game = this.games.get(gameId);
          if (game) {
              game.players.delete(playerId);
              this.playerGameMap.delete(playerId);

              console.log(`DEBUG: Player ${playerId} disconnected from game ${gameId}. Players remaining: ${game.players.size}`); // Debug log

              if (game.players.size === 0) {
                  this.stopGameLoop(gameId);
                  this.games.delete(gameId);
                  console.log(`DEBUG: Game ${gameId} removed due to no players.`); // Debug log
              } else {
                  console.log(`DEBUG: Player ${playerId} left game ${gameId}. Remaining players: ${game.players.size}`); // Debug log
              }
          } else {
              console.log(`DEBUG: Disconnected player ${playerId} had a gameId (${gameId}) but game instance not found.`); // Debug log
          }
      } else {
          console.log(`DEBUG: Disconnected player ${playerId} not found in playerGameMap (not in an active game).`); // Debug log
      }
  }
}