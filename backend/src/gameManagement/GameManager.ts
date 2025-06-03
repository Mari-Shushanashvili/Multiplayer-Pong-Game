import { v4 as uuidv4 } from 'uuid';

class Game {
    id: string;
    players: Map<string, 1 | 2> = new Map();

    constructor(gameId: string) {
        this.id = gameId;
        console.log(`Placeholder Game ${this.id} created.`);
    }

    addPlayer(playerId: string): { success: boolean, playerNumber?: 1 | 2, error?: string } {
        if (this.players.size >= 2) {
            return { success: false, error: "Game is full" };
        }
        const playerNumber: 1 | 2 = (this.players.size === 0) ? 1 : 2;
        this.players.set(playerId, playerNumber);
        return { success: true, playerNumber };
    }

    getPlayersCount(): number {
        return this.players.size;
    }
}


interface JoinResult {
  success: boolean;
  error?: string;
  playerNumber?: 1 | 2;
}

export class GameManager {
  private games: Map<string, Game> = new Map();

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

}