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

    /**
     * Initializes the game state with default starting values.
     * Sets initial ball and paddle positions, scores, and status.
     */
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

    /**
     * Adds a player to the game instance.
     * @param playerId - The unique ID of the player (Socket.IO socket.id).
     * @returns An object indicating success, assigned player number, or an error.
     */
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

    /**
     * Returns the current number of players in the game.
     * @returns The count of active players.
     */
    getPlayersCount(): number {
        return this.players.size;
    }

    /**
     * Updates the ball's position and handles all collisions (walls, paddles) and scoring.
     * @param deltaTime - The time elapsed since the last update, used for frame-rate independent movement.
     */
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

        const ballLeft = this.gameState.ballX - this.gameState.ballRadius;
        const ballRight = this.gameState.ballX + this.gameState.ballRadius;
        const ballTop = this.gameState.ballY - this.gameState.ballRadius;
        const ballBottom = this.gameState.ballY + this.gameState.ballRadius;

        const p1PaddleRight = PADDLE1_X + PADDLE_WIDTH;
        const p1PaddleTop = this.gameState.player1PaddleY;
        const p1PaddleBottom = this.gameState.player1PaddleY + PADDLE_HEIGHT;

        const p2PaddleLeft = PADDLE2_X;
        const p2PaddleRight = PADDLE2_X + PADDLE_WIDTH;
        const p2PaddleTop = this.gameState.player2PaddleY;
        const p2PaddleBottom = this.gameState.player2PaddleY + PADDLE_HEIGHT;

        if (this.ballVelocityX < 0 && 
            ballRight >= PADDLE1_X && 
            ballLeft <= p1PaddleRight && 
            ballBottom >= p1PaddleTop && 
            ballTop <= p1PaddleBottom
        ) {
            this.gameState.ballX = PADDLE1_X + PADDLE_WIDTH + this.gameState.ballRadius;
            this.ballVelocityX *= -1;

            const hitPoint = (this.gameState.ballY - this.gameState.player1PaddleY) / PADDLE_HEIGHT;
            const bounceAngleFactor = (hitPoint - 0.5) * 2;
            this.ballVelocityY = this.ballVelocityY * 0.8 + bounceAngleFactor * BALL_INITIAL_SPEED;
        }

        if (this.ballVelocityX > 0 && 
            ballLeft <= p2PaddleRight && 
            ballRight >= p2PaddleLeft && 
            ballBottom >= p2PaddleTop && 
            ballTop <= p2PaddleBottom
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

    /**
     * Moves a specified player's paddle vertically, clamping its position within game boundaries.
     * @param playerNumber - The number of the player (1 or 2) whose paddle to move.
     * @param deltaY - The amount of vertical movement (positive for down, negative for up).
     */
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

    /**
     * Returns the current GameState object.
     * @returns The current state of the game.
     */
    getGameState(): GameState {
        return this.gameState;
    }

    /**
     * Resets the ball to the center of the game area with a new initial velocity.
     * @param initialHorizontalDirection - The horizontal direction for the ball's initial serve (1 for right, -1 for left).
     */
    private resetBall(initialHorizontalDirection: 1 | -1) {
        this.gameState.ballX = GAME_WIDTH / 2;
        this.gameState.ballY = GAME_HEIGHT / 2;
        this.ballVelocityX = initialHorizontalDirection * BALL_INITIAL_SPEED;
        this.ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * BALL_INITIAL_SPEED;
        this.gameState.status = 'playing';
    }
}