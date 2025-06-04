import React, { useState, useEffect } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import type { GameState, GameStatus } from './types/GameState';
import Lobby from './components/Lobby';


// Set this to true to test
// false for the regular app
const TESTING_GAMECANVAS_MODE = true;


function App() {
  //CODE FOR TESTING
  if (TESTING_GAMECANVAS_MODE) {
    const [mockGameState, setMockGameState] = useState<GameState | null>(null);

    useEffect(() => {
      const initialGameState: GameState = {
        ballX: 400,
        ballY: 300,
        ballRadius: 10,
        player1PaddleY: 250,
        player2PaddleY: 250,
        paddleWidth: 15,
        paddleHeight: 100,
        player1Score: 0,
        player2Score: 0,
        status: 'waiting',
        gameWidth: 800,
        gameHeight: 600,
      };
      setMockGameState(initialGameState);

      const startGameTimeout = setTimeout(() => {
        setMockGameState(prev => prev ? { ...prev, status: 'playing' } : null);
      }, 2000);

      let ballX = initialGameState.ballX;
      let ballY = initialGameState.ballY;
      let ballVelX = 5;
      let ballVelY = 5;
      let p1Y = initialGameState.player1PaddleY;
      let p2Y = initialGameState.player2PaddleY;
      const paddleSpeed = 8;
      const gameHeight = initialGameState.gameHeight;
      const paddleHeight = initialGameState.paddleHeight;
      const ballRadius = initialGameState.ballRadius;

      const interval = setInterval(() => {
        if (mockGameState?.status === 'playing') {
          ballX += ballVelX;
          ballY += ballVelY;

          if (ballY - ballRadius < 0 || ballY + ballRadius > gameHeight) {
            ballVelY *= -1;
          }
          if (ballY % 50 < 25) {
              p1Y += paddleSpeed;
              p2Y -= paddleSpeed;
          } else {
              p1Y -= paddleSpeed;
              p2Y += paddleSpeed;
          }
          p1Y = Math.max(0, Math.min(gameHeight - paddleHeight, p1Y));
          p2Y = Math.max(0, Math.min(gameHeight - paddleHeight, p2Y));


          setMockGameState(prev => prev ? {
            ...prev,
            ballX,
            ballY,
            player1PaddleY: p1Y,
            player2PaddleY: p2Y,
          } : null);
        }
      }, 1000 / 60);

      return () => {
        clearInterval(interval);
        clearTimeout(startGameTimeout);
      };
    }, [mockGameState?.status]);

    return (
      <div className="App">
        <GameCanvas gameState={mockGameState} />
        <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          Game Status: {mockGameState?.status}
        </div>
      </div>
    );
  }


  //CODE FOR CLEAN
  else {
    const handleJoinGame = (playerName: string) => {
      console.log(`Player ${playerName} wants to join the game! (Not yet connected to backend)`);
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