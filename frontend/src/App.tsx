import React from 'react';
import './App.css';

import Lobby from './components/Lobby';

const TESTING_GAMECANVAS_MODE = false;

function App() {
  if (TESTING_GAMECANVAS_MODE) {
    return <div style={{ color: 'red' }}>Error: TESTING_GAMECANVAS_MODE is TRUE but should be FALSE for clean code!</div>;
  }

  else {
    const handleJoinGame = (playerName: string) => {
      console.log(`Player ${playerName} wants to join the game! (Will connect to backend soon)`);
      alert(`Hello, ${playerName}! Your game will start soon.`);
    };

    return (
      <div className="App">
        <Lobby onJoinGame={handleJoinGame} />
      </div>
    );
  }
}

export default App;