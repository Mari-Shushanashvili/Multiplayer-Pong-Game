import React, { useState } from 'react';
import './Lobby.css';

/**
 * Props interface for the Lobby component.
 * Defines the properties that the parent component will pass to Lobby.
 */
interface LobbyProps {
  onJoinGame: (playerName: string) => void;
}

/**
 * The Lobby component serves as the initial screen for players.
 * It allows them to enter their name and initiate joining a game.
 * @param {LobbyProps} props - The properties passed to the component.
 */
const Lobby: React.FC<LobbyProps> = ({ onJoinGame }) => {
  const [playerName, setPlayerName] = useState<string>('');

  /**
   * Handles the click event of the "Join Game" button.
   * Prevents default form submission, trims the player name,
   * and calls the onJoinGame callback if the name is not empty.
   */
  const handleJoinClick = () => {
    const trimmedName = playerName.trim();
    if (trimmedName) {
      onJoinGame(trimmedName);
    } else {
      alert('Please enter your name to join the game!');
    }
  };

  /**
   * Handles the key press event on the input field.
   * Triggers handleJoinClick if the Enter key is pressed.
   * @param e - The keyboard event.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinClick();
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-card">
        <h1 className="lobby-title">Ping Pong</h1>
        <p className="lobby-subtitle">Multiplayer Game</p>

        <div className="player-input-group">
          <label htmlFor="playerName" className="player-input-label">
            Your name:
          </label>
          <input
            type="text"
            id="playerName"
            className="player-input-field"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <button
          onClick={handleJoinClick}
          className="join-button"
        >
          Join Game
        </button>

        <div className="instructions-section">
          <h2 className="instructions-title">How to Play:</h2>
          <ul className="instructions-list">
            <li>Move your mouse to control your paddle.</li>
            <li>Hit the ball to score points.</li>
            <li>First to 5 points wins!</li>
            <li>You'll be matched with another player.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lobby;