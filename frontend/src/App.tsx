import React, { useState, useEffect } from 'react';
import './App.css'; 
import { io, Socket } from 'socket.io-client';
import Lobby from './components/Lobby';
import GameCanvas from './components/GameCanvas';
import Scoreboard from './components/Scoreboard';
import ErrorMessage from './components/ErrorMessage';
import { type GameState} from './types/GameState'; 

/**
 * The main application component for the Pong game.
 * Manages Socket.IO connection, game state, and conditionally renders
 * the Lobby or the game screen components.
 */
function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inGame, setInGame] = useState<boolean>(false);
  const [gameInfo, setGameInfo] = useState<{ gameId: string; playerNumber: 1 | 2; playerName: string } | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const PADDLE_CONTROLS = {
    'w': { playerNumber: 1, deltaY: -1 },
    's': { playerNumber: 1, deltaY: 1 },
    'ArrowUp': { playerNumber: 2, deltaY: -1 },
    'ArrowDown': { playerNumber: 2, deltaY: 1 },
  };
  const FRONTEND_PADDLE_SPEED = 8;


  /**
   * Manages the Socket.IO client connection lifecycle and sets up all event listeners.
   * This effect runs only when the `socket` instance changes.
   */
  useEffect(() => {
    if (socket) {
      setErrorMessage(null);

      socket.on('connect', () => {
        console.log('FRONTEND: Connected to server with ID:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('FRONTEND: Disconnected from server.');
        setInGame(false);
        setGameInfo(null);
        setGameState(null);
        setErrorMessage('Disconnected from server. Please refresh to try again.');
      });

      socket.on('gameCreated', (data: { gameId: string; playerNumber: 1; playerName: string }) => {
        console.log('FRONTEND: Game Created Success:', data);
        setGameInfo(data);
        setInGame(true);
        setErrorMessage(null);
      });

      socket.on('joinedGame', (data: { gameId: string; playerNumber: 1 | 2; playerName: string }) => {
        console.log('FRONTEND: Successfully Joined Game:', data);
        setGameInfo(data);
        setInGame(true);
        setErrorMessage(null);
      });

      socket.on('playerJoinedRoom', (data: { playerId: string; playerNumber: 1 | 2; playerName: string }) => {
        console.log(`FRONTEND: Another player (${data.playerName}) joined the room as Player ${data.playerNumber}.`);
      });

      socket.on('gameState', (data: GameState) => {
        setGameState(data);
      });

      socket.on('error', (data: { message: string }) => {
        console.error('FRONTEND ERROR from server:', data.message);
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

  /**
   * Manages the emission of 'paddleMove' events to the backend based on pressed keys.
   * This effect runs periodically when the player is in a game.
   */
  useEffect(() => {
    let emitInterval: number;

    if (inGame && socket && gameInfo && gameInfo.gameId) {
      emitInterval = window.setInterval(() => {
        let deltaY = 0;
        if (gameInfo.playerNumber === 1) {
          if (pressedKeys.has('w')) deltaY -= FRONTEND_PADDLE_SPEED;
          if (pressedKeys.has('s')) deltaY += FRONTEND_PADDLE_SPEED;
        } else if (gameInfo.playerNumber === 2) {
          if (pressedKeys.has('ArrowUp')) deltaY -= FRONTEND_PADDLE_SPEED;
          if (pressedKeys.has('ArrowDown')) deltaY += FRONTEND_PADDLE_SPEED;
        }

        if (deltaY !== 0) {
          socket.emit('paddleMove', {
            gameId: gameInfo.gameId,
            deltaY: deltaY,
          });
        }
      }, 1000 / 60);
    }

    return () => {
      if (emitInterval) {
        window.clearInterval(emitInterval);
      }
    };
  }, [inGame, socket, gameInfo, pressedKeys]);

  /**
   * Manages global keyboard event listeners (keydown and keyup).
   * This effect runs once on component mount to attach listeners and cleans them up on unmount.
   */
  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (PADDLE_CONTROLS.hasOwnProperty(event.key)) {
              event.preventDefault();
              setPressedKeys(prevKeys => {
                  const newKeys = new Set(prevKeys);
                  newKeys.add(event.key);
                  return newKeys;
              });
          }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
          if (PADDLE_CONTROLS.hasOwnProperty(event.key)) {
              event.preventDefault();
              setPressedKeys(prevKeys => {
                  const newKeys = new Set(prevKeys);
                  newKeys.delete(event.key);
                  return newKeys;
              });
          }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
      };
  }, []);

  /**
   * Callback function passed to the Lobby component.
   * Initiates Socket.IO connection and emits either 'createGame' or 'joinGame' event.
   * @param playerName - The name of the player.
   * @param gameId - Optional; the ID of the game to join. If not provided, a new game is created.
   */
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
        <div className="game-screen-container" style={{ height: 'calc(100vh - 20px)' }}>
          <Scoreboard 
            player1Score={gameState?.player1Score || 0} 
            player2Score={gameState?.player2Score || 0} 
            player1Name={gameInfo?.playerNumber === 1 ? gameInfo.playerName : (gameInfo?.playerNumber === 2 ? "Player 1" : "Player 1")}
            player2Name={gameInfo?.playerNumber === 2 ? gameInfo.playerName : (gameInfo?.playerNumber === 1 ? "Player 2" : "Player 2")}
          />
          
          {gameInfo?.gameId && (
            <div className="game-id-display" style={{ color: 'white', textAlign: 'center', marginTop: '5px', marginBottom: '5px', fontSize: '0.9rem', padding: '5px', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              Game ID: <strong style={{ userSelect: 'all' }}>{gameInfo.gameId}</strong> (Share this with a friend!)
            </div>
          )}

          <GameCanvas gameState={gameState} />
          
          <div className="game-status-text" style={{ color: 'white', textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}>
            Game Status: {gameState?.status}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;