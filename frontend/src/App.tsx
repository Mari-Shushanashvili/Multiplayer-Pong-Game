import React, { useState, useEffect } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import Lobby from './components/Lobby';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('FRONTEND: Connected to server with ID:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('FRONTEND: Disconnected from server.');
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        if (socket.connected) {
          socket.disconnect();
        }
      };
    }
  }, [socket]);

  const handleJoinGame = (playerName: string) => {
    console.log(`Player ${playerName} wants to join the game!`);

    if (!socket || !socket.connected) {
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);
      console.log("FRONTEND: Attempting to connect to Socket.IO server...");
    } else {
      console.log("FRONTEND: Already connected. Not initiating new connection.");
    }
  };

  return (
    <div className="App">
      <Lobby onJoinGame={handleJoinGame} />
    </div>
  );
}

export default App;