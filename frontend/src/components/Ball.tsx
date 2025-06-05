import React from 'react';
import './Ball.css';

/**
 * Props interface for the Ball component.
 * Defines the position and radius of the ball.
 */
interface BallProps {
  x: number;
  y: number;
  radius: number;
}

/**
 * The Ball component renders the game ball as a simple circle.
 * Its position and size are controlled by the props it receives.
 * @param {BallProps} props - The properties passed to the component.
 */
const Ball: React.FC<BallProps> = ({ x, y, radius }) => {
  const ballStyle: React.CSSProperties = {
    left: `${x - radius}px`,
    top: `${y - radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  };

  return (
    <div className="game-ball" style={ballStyle}></div>
  );
};

export default Ball;