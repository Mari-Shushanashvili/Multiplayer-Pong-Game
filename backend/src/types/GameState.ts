export type GameStatus = 'waiting' | 'playing' | 'gameOver' | 'paused';

export interface GameState {
  ballX: number;
  ballY: number;
  ballRadius: number;

  player1PaddleY: number;
  player2PaddleY: number;
  paddleWidth: number;
  paddleHeight: number;

  player1Score: number;
  player2Score: number;

  status: GameStatus;

  player1Name?: string;
  player2Name?: string;

  winner?: 'player1' | 'player2' | 'draw' | null;

  gameWidth: number;
  gameHeight: number;
}