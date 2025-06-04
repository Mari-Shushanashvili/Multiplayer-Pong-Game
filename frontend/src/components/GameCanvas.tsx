import React, { useRef, useLayoutEffect } from 'react';
import { type GameState, type GameStatus } from '../types/GameState';
import Paddle from './Paddle';
import Ball from './Ball';
import './GameCanvas.css';

/**
 * Props interface for the GameCanvas component.
 * Defines the properties that the parent component will pass to GameCanvas.
 */
interface GameCanvasProps {
  gameState: GameState | null;
}

/**
 * The GameCanvas component is responsible for rendering the visual elements of the game
 * (game area, paddles, ball) using an HTML5 canvas.
 * @param {GameCanvasProps} props - The properties passed to the component.
 */
const GameCanvas: React.FC<GameCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = gameState?.gameWidth || 800;
    canvas.height = gameState?.gameHeight || 600;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameState || gameState.status === 'waiting') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Waiting for players...', canvas.width / 2, canvas.height / 2);
      return; }



    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);


  }, [gameState]);

  return (
    <div className="game-canvas-container">
      <canvas ref={canvasRef} className="game-canvas-element"></canvas>
      {}
      {gameState && (
        <>
          <Paddle
            x={0}
            y={gameState.player1PaddleY}
            width={gameState.paddleWidth}
            height={gameState.paddleHeight}
            playerNumber={1}
          />
          <Paddle
            x={gameState.gameWidth - gameState.paddleWidth}
            y={gameState.player2PaddleY}
            width={gameState.paddleWidth}
            height={gameState.paddleHeight}
            playerNumber={2}
          />
          <Ball
            x={gameState.ballX}
            y={gameState.ballY}
            radius={gameState.ballRadius}
          />
        </>
      )}
    </div>
  );
};

export default GameCanvas;