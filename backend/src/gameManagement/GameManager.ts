import { v4 as uuidv4 } from 'uuid';
import { Game } from '../game/Game';


interface JoinResult {
  success: boolean;
  error?: string;
  playerNumber?: 1 | 2;
}

export class GameManager {
  private games: Map<string, Game> = new Map();

  constructor() {
  }

  createGame(): string {
    const gameId = uuidv4();
    const newGame = new Game(gameId);
    this.games.set(gameId, newGame);
    return gameId;
  }

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

    return { success: true, playerNumber: addPlayerResult.playerNumber };
  }
  
  getGame(gameId: string): Game | undefined {
      return this.games.get(gameId);
  }

  removeGame(gameId: string): boolean {
      return this.games.delete(gameId);
  }
}