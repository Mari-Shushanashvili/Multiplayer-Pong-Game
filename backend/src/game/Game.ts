import { GameState, GameStatus } from '../types/GameState';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
export const PADDLE_SPEED = 8;
const BALL_INITIAL_SPEED = 5;

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
    }

    movePaddle(playerNumber: 1 | 2, deltaY: number) {
        let currentPaddleY = (playerNumber === 1) ? this.gameState.player1PaddleY : this.gameState.player2PaddleY;
        const newPaddleY = currentPaddleY + deltaY;
        const minPaddleY = 0;
        const maxPaddleY = GAME_HEIGHT - PADDLE_HEIGHT
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
}