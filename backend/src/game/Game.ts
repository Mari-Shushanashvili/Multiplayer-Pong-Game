import { GameState, GameStatus } from '../types/GameState';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const PADDLE_WIDTH = 15;
export const PADDLE_HEIGHT = 100;
export const BALL_RADIUS = 10;
export const PADDLE_SPEED = 8;
export const BALL_INITIAL_SPEED = 5;

const PADDLE1_X = 0;
const PADDLE2_X = GAME_WIDTH - PADDLE_WIDTH;

export class Game {
    id: string;
    players: Map<string, 1 | 2> = new Map();
    private gameState!: GameState;
    private ballVelocityX!: number;
    private ballVelocityY!: number;

    constructor(gameId: string) {
        this.id = gameId;
        this.initializeGameState();
    }

    private initializeGameState() {
        this.gameState = {
            ballX: GAME_WIDTH / 2,
            ballY: GAME_HEIGHT / 2,
            ballRadius: BALL_RADIUS,
            player1PaddleY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
            player2PaddleY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
            paddleWidth: PADDLE_WIDTH,
            paddleHeight: PADDLE_HEIGHT,
            player1Score: 0,
            player2Score: 0,
            status: 'waiting',
            gameWidth: GAME_WIDTH,
            gameHeight: GAME_HEIGHT,
        };
        this.ballVelocityX = (Math.random() > 0.5 ? 1 : -1) * BALL_INITIAL_SPEED;
        this.ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * BALL_INITIAL_SPEED;
    }

    addPlayer(playerId: string): { success: boolean, playerNumber?: 1 | 2, error?: string } {
        if (this.players.size >= 2) {
            return { success: false, error: "Game is full" };
        }
        if (this.players.has(playerId)) {
            return { success: false, error: "Player already in this game." };
        }
        
        const playerNumber: 1 | 2 = (this.players.size === 0) ? 1 : 2; 
        this.players.set(playerId, playerNumber);
        
        if (this.players.size === 2) {
            this.gameState.status = 'playing';
        }

        return { success: true, playerNumber };
    }

    getPlayersCount(): number {
        return this.players.size;
    }

    updateBall(deltaTime: number = 1) {
        if (this.gameState.status !== 'playing') {
            return;
        }

        this.gameState.ballX += this.ballVelocityX * deltaTime;
        this.gameState.ballY += this.ballVelocityY * deltaTime;

        if (this.gameState.ballY - this.gameState.ballRadius < 0) {
            this.gameState.ballY = this.gameState.ballRadius;
            this.ballVelocityY *= -1;
        }
        if (this.gameState.ballY + this.gameState.ballRadius > GAME_HEIGHT) {
            this.gameState.ballY = GAME_HEIGHT - this.gameState.ballRadius;
            this.ballVelocityY *= -1;
        }

        if (this.ballVelocityX < 0 &&
            this.gameState.ballX - this.gameState.ballRadius <= PADDLE1_X + PADDLE_WIDTH &&
            this.gameState.ballX - this.gameState.ballRadius >= PADDLE1_X &&
            this.gameState.ballY + this.gameState.ballRadius >= this.gameState.player1PaddleY &&
            this.gameState.ballY - this.gameState.ballRadius <= this.gameState.player1PaddleY + PADDLE_HEIGHT
        ) {
            this.gameState.ballX = PADDLE1_X + PADDLE_WIDTH + this.gameState.ballRadius;
            this.ballVelocityX *= -1;

            const hitPoint = (this.gameState.ballY - this.gameState.player1PaddleY) / PADDLE_HEIGHT;
            const bounceAngleFactor = (hitPoint - 0.5) * 2;
            this.ballVelocityY = this.ballVelocityY * 0.8 + bounceAngleFactor * BALL_INITIAL_SPEED;
        }

        if (this.ballVelocityX > 0 &&
            this.gameState.ballX + this.gameState.ballRadius >= PADDLE2_X &&
            this.gameState.ballX + this.gameState.ballRadius <= PADDLE2_X + PADDLE_WIDTH &&
            this.gameState.ballY + this.gameState.ballRadius >= this.gameState.player2PaddleY &&
            this.gameState.ballY - this.gameState.ballRadius <= this.gameState.player2PaddleY + PADDLE_HEIGHT
        ) {
            this.gameState.ballX = PADDLE2_X - this.gameState.ballRadius;
            this.ballVelocityX *= -1;

            const hitPoint = (this.gameState.ballY - this.gameState.player2PaddleY) / PADDLE_HEIGHT;
            const bounceAngleFactor = (hitPoint - 0.5) * 2;
            this.ballVelocityY = this.ballVelocityY * 0.8 + bounceAngleFactor * BALL_INITIAL_SPEED;
        }

        if (this.gameState.ballX - this.gameState.ballRadius < 0) {
            this.gameState.player2Score++;
            this.resetBall(1);
        }
        else if (this.gameState.ballX + this.gameState.ballRadius > GAME_WIDTH) {
            this.gameState.player1Score++;
            this.resetBall(-1);
        }
    }

    movePaddle(playerNumber: 1 | 2, deltaY: number) {
        let currentPaddleY = (playerNumber === 1) ? this.gameState.player1PaddleY : this.gameState.player2PaddleY;
        const newPaddleY = currentPaddleY + deltaY;

        const minPaddleY = 0;
        const maxPaddleY = GAME_HEIGHT - PADDLE_HEIGHT;

        if (newPaddleY < minPaddleY) {
            currentPaddleY = minPaddleY;
        } else if (newPaddleY > maxPaddleY) {
            currentPaddleY = maxPaddleY;
        } else {
            currentPaddleY = newPaddleY;
        }

        if (playerNumber === 1) {
            this.gameState.player1PaddleY = currentPaddleY;
        } else {
            this.gameState.player2PaddleY = currentPaddleY;
        }
    }

    getGameState(): GameState {
        return this.gameState;
    }

    private resetBall(initialHorizontalDirection: 1 | -1) {
        this.gameState.ballX = GAME_WIDTH / 2;
        this.gameState.ballY = GAME_HEIGHT / 2;
        this.ballVelocityX = initialHorizontalDirection * BALL_INITIAL_SPEED;
        this.ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * BALL_INITIAL_SPEED;
        this.gameState.status = 'playing';
    }
}