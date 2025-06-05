# Real-Time Multiplayer Pong Game

## Project Overview

This project implements a classic multiplayer Pong game, demonstrating full-stack development with real-time communication capabilities. Two players can connect to a central server, control their paddles, and compete as a ball moves across the game area. The game state (paddle positions, ball position, and score) is synchronized in real-time across all connected browsers, providing a seamless and interactive experience.

## Key Features

* **Real-Time Communication:** Utilizes Socket.IO for live, bidirectional communication between clients and the server, enabling instant game state updates.
* **Game Session Management:** Supports creating new game rooms and joining existing ones, allowing two players to be paired for a match.
* **Server-Authoritative Game Logic:** The Node.js backend acts as the authoritative source for all game mechanics, ensuring fair play and consistent state.
* **Core Game Mechanics:** Implements ball movement, precise collision detection (ball-walls, ball-paddles), and a scoring system.
* **Win Condition:** The game correctly detects when a player reaches the winning score, ending the match and cleaning up server resources.
* **Responsive Frontend:** An interactive React UI visually represents the game, adapting to different screen sizes.
* **Player Input:** Captures keyboard input for paddle control, sending player actions to the server for processing.
* **Error Handling:** Displays clear error messages to the user for scenarios like attempting to join a full or non-existent game.
* **Resource Management:** Server-side game loops are correctly started and stopped, and game instances are cleaned up when players disconnect.
* **TypeScript Integration:** Utilizes TypeScript across both frontend and backend for enhanced type safety and code maintainability.

## Technologies Used

* **Backend:**
    * Node.js
    * Express.js (Web Framework)
    * Socket.IO (Real-time communication)
    * TypeScript
    * `uuid` (for unique ID generation)
    * `nodemon` (for development auto-restarts)
* **Frontend:**
    * React (UI Library)
    * Vite (Build Tool)
    * Socket.IO Client
    * TypeScript
    * CSS (for styling)

## Project Structure

The project is divided into two main parts:

* **`backend/`**: Contains the Node.js server.
    * `src/server.ts`: Main server entry point, handles HTTP requests and Socket.IO connections.
    * `src/gameManagement/GameManager.ts`: Manages multiple `Game` instances (rooms).
    * `src/game/Game.ts`: Encapsulates the core game logic, state updates, and physics for a single Pong match.
    * `src/types/GameState.ts`: Defines shared TypeScript interfaces for the game state.
* **`frontend/`**: Contains the React application.
    * `src/App.tsx`: Main React component, manages global state, Socket.IO client, and UI routing (Lobby vs. Game screen).
    * `src/components/`: Houses reusable UI components like `Lobby`, `GameCanvas`, `Paddle`, `Ball`, `Scoreboard`, and `ErrorMessage`.
    * `src/types/GameState.ts`: (A copy of the backend's `GameState.ts` for frontend type safety).

## Setup and Installation

Follow these steps to get the project running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Mari-Shushanashvili/Multiplayer-Pong-Game
    cd Multiplayer-Pong-Game
    ```
    (Replace `YourUsername` with your actual GitHub username if you've already pushed it.)

2.  **Project Directory Setup:**
    Ensure you have the `backend` and `frontend` subdirectories.

3.  **Backend Setup:**
    * Navigate into the `backend` directory:
        ```bash
        cd backend
        ```
    * Initialize the Node.js project and install dependencies:
        ```bash
        npm init -y
        npm install express cors socket.io uuid
        npm install -D typescript ts-node nodemon @types/node @types/express @types/socket.io @types/uuid
        ```
    * Create the `backend/src` and `backend/src/gameManagement`, `backend/src/game`, `backend/src/types` directories manually if they don't exist, and place the corresponding `.ts` files there.
    * Create `backend/tsconfig.json` with the standard configuration:
        ```json
        {
          "compilerOptions": {
            "target": "ES2020",
            "module": "commonjs",
            "outDir": "./dist",
            "rootDir": "./src",
            "strict": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
          },
          "include": ["src/**/*"],
          "exclude": ["node_modules", "dist"]
        }
        ```
    * Update `backend/package.json` scripts:
        ```json
        {
          "scripts": {
            "dev": "nodemon src/server.ts",
            "build": "tsc",
            "start": "node dist/server.js"
          }
        }
        ```
    * Ensure your `server.ts`, `GameManager.ts`, and `Game.ts` files are in their correct final versions.

4.  **Frontend Setup:**
    * Navigate back to the project root, then into the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    * Create the React project with Vite and install client dependencies:
        ```bash
        npm create vite@latest . -- --template react-ts
        npm install socket.io-client
        ```
    * Create the `frontend/src/components` and `frontend/src/types` directories manually if they don't exist.
    * Place all your frontend component files (`Lobby.tsx`, `GameCanvas.tsx`, `Paddle.tsx`, `Ball.tsx`, `Scoreboard.tsx`, `ErrorMessage.tsx`) and their respective `.css` files into `frontend/src/components`.
    * Place `GameState.ts` into `frontend/src/types`.
    * Ensure your `App.tsx` is in its clean, non-testing mode (`TESTING_GAMECANVAS_MODE = false;`) and includes all the necessary Socket.IO logic and component imports.
    * Update `frontend/package.json` scripts (if Vite didn't do this automatically):
        ```json
        {
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          }
        }
        ```
    * Adjust `frontend/src/App.css`, `frontend/src/components/Lobby.css`, `frontend/src/components/GameCanvas.css`, `frontend/src/components/Paddle.css`, `frontend/src/components/Ball.css`, `frontend/src/components/Scoreboard.css`, `frontend/src/components/ErrorMessage.css` with the final styling provided during development (e.g., width, height adjustments, positioning).

## How to Run the Game

1.  **Start the Backend Server:**
    * Open a terminal and navigate to the `backend` directory:
        ```bash
        cd Multiplayer-Pong-Game/backend
        ```
    * Run the server:
        ```bash
        npm run dev
        ```
    * You should see `Server is running on http://localhost:3001` and `GameManager initialized` in the terminal. Keep this terminal open.

2.  **Start the Frontend Application:**
    * Open a **new** terminal and navigate to the `frontend` directory:
        ```bash
        cd Multiplayer-Pong-Game/frontend
        ```
    * Run the frontend development server:
        ```bash
        npm run dev
        ```
    * You should see Vite reporting the local URL (e.g., `http://localhost:5173/`). Keep this terminal open.

3.  **Play the Game:**
    * Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173/`).
    * **To play a match:**
        * **Player 1 (Creator):** In the first browser tab, enter your name (e.g., "Player1") and click **"Create New Game"**. The UI will switch to the game screen. Note the "Game ID" displayed.
        * **Player 2 (Joiner):** Open a **second browser tab**. Enter your name (e.g., "Player2"), paste the "Game ID" from the first tab into the "Game ID" input, and click **"Join Existing Game"**. The UI will switch, and the game will synchronize.
    * **Controls:**
        * **Player 1 (Left Paddle):** 'W' (Up), 'S' (Down)
        * **Player 2 (Right Paddle):** 'ArrowUp' (Up), 'ArrowDown' (Down)

Enjoy the game!
