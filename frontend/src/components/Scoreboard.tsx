import React from 'react';
import './Scoreboard.css';

/**
 * Props interface for the Scoreboard component.
 * Defines the scores for both players.
 */
interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
  player1Name?: string;
  player2Name?: string;
}

/**
 * The Scoreboard component displays the current scores of both players.
 * @param {ScoreboardProps} props - The properties passed to the component.
 */
const Scoreboard: React.FC<ScoreboardProps> = ({ player1Score, player2Score, player1Name, player2Name }) => {
  const p1DisplayName = player1Name || 'Player 1';
  const p2DisplayName = player2Name || 'Player 2';

  return (
    <div className="scoreboard-container">
      <div className="player-score">
        <span className="player-name">{p1DisplayName}</span>
        <span className="score-value">{player1Score}</span>
      </div>
      <div className="score-separator">VS</div>
      <div className="player-score">
        <span className="player-name">{p2DisplayName}</span>
        <span className="score-value">{player2Score}</span>
      </div>
    </div>
  );
};

export default Scoreboard;