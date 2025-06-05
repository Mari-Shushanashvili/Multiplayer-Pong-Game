import React, { useState, useEffect } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import Lobby from './components/Lobby';
import GameCanvas from './components/GameCanvas';
import Scoreboard from './components/Scoreboard';
import ErrorMessage from './components/ErrorMessage';
import { type GameState } from './types/GameState';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inGame, setInGame] = useState<boolean>(false);
  const [gameInfo, setGameInfo] = useState<{ gameId: string; playerNumber: 1 | 2; playerName: string } | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setErrorMessage(null); 
      });

      socket.on('disconnect', () => {
        setInGame(false);
        setGameInfo(null);
        setGameState(null);
        setErrorMessage('Disconnected from server. Please refresh to try again.');
      });

      socket.on('gameCreated', (data: { gameId: string; playerNumber: 1; playerName: string }) => {
        setGameInfo(data);
        setInGame(true);
        setErrorMessage(null);
      });

      socket.on('joinedGame', (data: { gameId: string; playerNumber: 1 | 2; playerName: string }) => {
        setGameInfo(data);
        setInGame(true);
        setErrorMessage(null);
      });

      socket.on('playerJoinedRoom', () => {});

      socket.on('gameState', (data: GameState) => {
        setGameState(data);
      });

      socket.on('error', (data: { message: string }) => {
        setErrorMessage(data.message);
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('gameCreated');
        socket.off('joinedGame');
        socket.off('playerJoinedRoom');
        socket.off('gameState');
        socket.off('error');
        if (socket.connected) {
          socket.disconnect();
        }
      };
    }
  }, [socket]);

  const handleJoinGame = (playerName: string, gameId?: string) => {
    setErrorMessage(null);

    if (!socket || !socket.connected) {
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        if (gameId) {
          newSocket.emit('joinGame', gameId, playerName);
        } else {
          newSocket.emit('createGame', playerName);
        }
      });
    } else {
      if (gameId) {
        socket.emit('joinGame', gameId, playerName);
      } else {
        socket.emit('createGame', playerName);
      }
    }
  };

  return (
    <div className="App">
      {errorMessage && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}

      {!inGame ? (
        <Lobby onJoinGame={handleJoinGame} />
      ) : (
        <div className="game-screen-container">
          <Scoreboard 
            player1Score={gameState?.player1Score || 0} 
            player2Score={gameState?.player2Score || 0} 
            player1Name={gameInfo?.playerNumber === 1 ? gameInfo.playerName : "Player 1"}
            player2Name={gameInfo?.playerNumber === 2 ? gameInfo.playerName : "Player 2"}
          />
          
          {gameInfo?.gameId && (
            <div style={{ color: 'white', textAlign: 'center', marginTop: '5px', marginBottom: '10px', fontSize: '0.9rem', padding: '5px', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              Game ID: <strong style={{ userSelect: 'all' }}>{gameInfo.gameId}</strong>
            </div>
          )}

          <GameCanvas gameState={gameState} />
          
          <div style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
            Game Status: {gameState?.status}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;