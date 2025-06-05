import React, { useState } from 'react';
import './Lobby.css';

/**
 * Props interface for the Lobby component.
 * Defines the properties that the parent component will pass to Lobby.
 */
interface LobbyProps {
  /**
   * Callback function to be invoked when the "Join Game" or "Create Game" button is clicked.
   * It receives the player's name and an optional gameId as arguments.
   * If gameId is provided, it's a join action; otherwise, it's a create action.
   */
  onJoinGame: (playerName: string, gameId?: string) => void;
}

/**
 * The Lobby component serves as the initial screen for players.
 * It allows them to enter their name and choose to create or join a game.
 * @param {LobbyProps} props - The properties passed to the component.
 */
const Lobby: React.FC<LobbyProps> = ({ onJoinGame }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');

  /**
   * Handles the click event of the "Create New Game" button.
   * Validates player name and calls onJoinGame without a gameId.
   */
  const handleCreateClick = () => {
    const trimmedName = playerName.trim();
    if (trimmedName) {
      onJoinGame(trimmedName);
    } else {
      alert('Please enter your name to create a game!');
    }
  };

  /**
   * Handles the click event of the "Join Existing Game" button.
   * Validates both player name and gameId, then calls onJoinGame with both.
   */
  const handleJoinExistingClick = () => {
    const trimmedName = playerName.trim();
    const trimmedGameId = gameId.trim();
    if (!trimmedName) {
      alert('Please enter your name to join a game!');
    } else if (!trimmedGameId) {
      alert('Please enter a Game ID to join!');
    } else {
      onJoinGame(trimmedName, trimmedGameId);
    }
  };

  /**
   * Handles the key press event on either input field.
   * Triggers the appropriate action if the Enter key is pressed.
   * @param e - The keyboard event.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.id === 'gameIdInput' && gameId.trim()) {
        handleJoinExistingClick();
      } else if (e.currentTarget.id === 'playerName' && playerName.trim()) {
        handleCreateClick();
      }
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

        <div className="player-input-group player-input-group-secondary">
          <label htmlFor="gameIdInput" className="player-input-label">
            Game ID (optional, to join specific game):
          </label>
          <input
            type="text"
            id="gameIdInput"
            className="player-input-field"
            placeholder="Enter game ID to join"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <button
          onClick={handleCreateClick}
          className="join-button button-create" 
        >
          Create New Game
        </button>

        <button
          onClick={handleJoinExistingClick}
          className="join-button button-join-existing"
        >
          Join Existing Game
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