import React from 'react';
import './Paddle.css'

/**
 * Props interface for the Paddle component.
 * Defines the position and dimensions of the paddle.
 */
interface PaddleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  playerNumber?: 1 | 2;
}

/**
 * The Paddle component renders a single paddle as a simple rectangle.
 * Its position and dimensions are controlled by the props it receives.
 * @param {PaddleProps} props - The properties passed to the component.
 */
const Paddle: React.FC<PaddleProps> = ({ x, y, width, height, playerNumber }) => {
  const paddleStyle: React.CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const paddleClass = `game-paddle ${playerNumber === 1 ? 'player-one-paddle' : playerNumber === 2 ? 'player-two-paddle' : ''}`;

  return (
    <div className={paddleClass} style={paddleStyle}></div>
  );
};

export default Paddle;