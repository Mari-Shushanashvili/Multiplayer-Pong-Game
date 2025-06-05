# Real-Time Multiplayer Pong Game - Detailed To-Do List

## Phase 1: Project Initialization and Setup

### Chunk 1.1: Project Setup

-   [x] **To-do 1.1.1: Create Git Repository**
    -   Create a new repository on your local machine or on a platform like GitHub (e.g., GitHub, GitLab, Bitbucket).
    -   Name the repository: `Multiplayer Pong Game` (or your preferred repository name).
    -   Navigate into the newly created directory using the command line: `cd "Multiplayer Pong Game"` (or the actual directory name if different).
    -   **Check:** Verify that the repository is created successfully and you are in the correct directory in the terminal.
-   [x] **To-do 1.1.2: Project Directory Setup**
    -   Create the following subdirectories within the root directory:
        -   `backend`: This directory will contain the Node.js server-side code.
        -   `frontend`: This directory will contain the React client-side code.
    -   **Check:** Verify that both `backend` and `frontend` directories are created in the root directory using the file explorer or the `ls` (macOS/Linux) or `dir` (Windows) command in the terminal.
-   [x] **To-do 1.1.3: Create `.gitignore` file**
    -   Create a `.gitignore` file in the root directory.
    -   Add the following entries to the `.gitignore` file:
        ```
        node_modules/
        backend/dist/
        frontend/dist/
        .DS_Store
        .env
        ```
    -   **Check:** Verify that the `.gitignore` file is created in the root directory and contains the specified entries. Also, verify that `node_modules` and `dist` directories (if they exist) are not tracked by Git (e.g., their color or status in your IDE or Git client is different).
-   [x] **To-do 1.1.4: Initial Commit**
    -   Initialize Git in the root directory (if not already initialized): `git init`
    -   Add all files to the staging area: `git add .`
    -   Commit the changes with an initial commit message: `git commit -m "Initial project setup: directories and .gitignore"`
    -   **Check:** Verify that the initial commit is created successfully by using `git log` or by checking the repository history in your Git client.

## Phase 2: Backend Development

### Chunk 2.1: Backend Project Setup

-   [x] **To-do 2.1.1: Navigate to the `backend` directory**
    -   Use the command line to navigate to the `backend` directory: `cd backend`
    -   **Check:** Verify that the current directory in the terminal is `backend`.
-   [x] **To-do 2.1.2: Initialize Node.js project**
    -   Run `npm init -y` to create a `package.json` file with default settings.
    -   **Check:** Verify that the `package.json` file is created in the `backend` directory.
-   [x] **To-do 2.1.3: Install backend dependencies**
    -   Install the following dependencies:
        -   `express`: For creating the web server.
        -   `socket.io`: For enabling real-time communication.
        -   `cors`: For handling Cross-Origin Resource Sharing.
        -   `uuid`: For generating unique IDs.
    -   Command: `npm install express cors socket.io uuid`
    -   **Check:** Verify that the dependencies are installed by checking the `node_modules` directory in `backend` and the `dependencies` section in `backend/package.json`.
-   [x] **To-do 2.1.4: Install TypeScript development dependencies**
    -   Install the following development dependencies:
        -   `typescript`: For using TypeScript.
        -   `ts-node`: For running TypeScript files directly during development.
        -   `nodemon`: For automatically restarting the server on code changes.
        -   `@types/node`: TypeScript type definitions for Node.js.
        -   `@types/express`: TypeScript type definitions for Express.
        -   `@types/socket.io`: TypeScript type definitions for Socket.IO.
        -   `@types/uuid`: TypeScript type definitions for uuid.
    -   Command: `npm install -D typescript ts-node nodemon @types/node @types/express @types/socket.io @types/uuid`
    -   **Check:** Verify that the dev dependencies are installed by checking the `node_modules` directory in `backend` and the `devDependencies` section in `backend/package.json`.
-   [x] **To-do 2.1.5: Configure TypeScript**
    -   Create a `tsconfig.json` file in the `backend` directory.
    -   Add the necessary configuration (as provided previously).
    -   **Check:** Verify that the `tsconfig.json` file is created in the `backend` directory and contains the specified configuration.
-   [x] **To-do 2.1.6: Update `package.json` scripts**
    -   Open the `backend/package.json` file.
    -   Modify the `scripts` section to include:
        ```json
        "scripts": {
          "dev": "nodemon src/server.ts",
          "build": "tsc",
          "start": "node dist/server.js"
        }
        ```
    -   **Check:** Verify that the `scripts` section in `backend/package.json` is updated correctly.

### Chunk 2.2: Basic Express and Socket.IO Setup

-   [x] **To-do 2.2.1: Create `backend/src/server.ts`**
    -   Create a `src` directory inside the `backend` directory.
    -   Create a `server.ts` file inside the `src` directory.
    -   **Check:** Verify that the `src` directory and the `server.ts` file are created in the correct locations.
-   [x] **To-do 2.2.2: Implement basic Express server**
    -   Open `backend/src/server.ts` and add the basic Express server setup code.
    -   **Check:** Verify that the code is added to `backend/src/server.ts` correctly.
-   [x] **To-do 2.2.3: Integrate Socket.IO**
    -   Modify `backend/src/server.ts` to integrate Socket.IO, creating an HTTP server and attaching Socket.IO to it.
    -   **Check:** Verify that the code is modified in `backend/src/server.ts` correctly, including the `http` and `socket.io` imports, server creation, and Socket.IO server initialization.
-   [x] **To-do 2.2.4: Handle `connect` and `disconnect` events**
    -   Add basic `io.on('connection')` and `socket.on('disconnect')` event handlers in `backend/src/server.ts`.
    -   **Check:** Verify that the `connect` and `disconnect` event handlers are added correctly within the `io.on('connection', ...)` block.
-   [x] **To-do 2.2.5: Handle `player-join` event**
    -   Add a `socket.on('player-join')` event handler in `backend/src/server.ts` (this will be removed in favor of `createGame`/`joinGame` later).
    -   **Check:** Verify that the `player-join` event handler is added correctly within the `io.on('connection', ...)` block.
-   [x] **To-do 2.2.6: Test basic Socket.IO connection (Manual)**
    -   Run the backend server. Use a temporary HTML page with Socket.IO client or browser console to connect and emit `player-join`.
    -   Observe backend console logs.
    -   **Check:** Verify that the server logs the connection, disconnection, and player join events correctly in the terminal.

### Chunk 2.3: Game Session Management

-   [x] **To-do 2.3.1: Create `GameManager` class**
    -   Create `backend/src/gameManagement` directory and `GameManager.ts` file.
    -   Define a `GameManager` class to manage game sessions and `Game` instances.
    -   **Check:** Verify that the directory and files are created and the `GameManager` class is defined.
-   [x] **To-do 2.3.2: Implement `createGame()` method**
    -   In the `GameManager` class, implement `createGame()` to create a `Game` instance, generate a `gameId`, and store it.
    -   **Check:** Verify that `createGame()` works as expected.
-   [x] **To-do 2.3.3: Implement `joinGame()` method**
    -   In the `GameManager` class, implement `joinGame()` to add players to a game, assign player numbers, and handle full/non-existent games.
    -   **Check:** Verify that `joinGame()` handles player joining and error conditions correctly.
-   [x] **To-do 2.3.4: Modify Socket.IO event handling in `server.ts`**
    -   In `backend/src/server.ts`, import and instantiate `GameManager`.
    -   Implement `socket.on('createGame')` and `socket.on('joinGame')` to use `GameManager` methods.
    -   **Check:** Verify that `createGame` and `joinGame` events are handled, clients join rooms, and errors are handled.

### Chunk 2.4: Core Game State Management

-   [x] **To-do 2.4.1: Define `GameState` interface**
    -   Create `backend/src/types` directory and `GameState.ts` file.
    -   Define `GameState` interface including properties for ball, paddles, scores, status, and game dimensions.
    -   **Check:** Verify that the `GameState` interface is defined with the correct properties.
-   [x] **To-do 2.4.2: Update `Game` class to manage `GameState`**
    -   Move `Game` class from `GameManager.ts` to `backend/src/game/Game.ts`.
    -   Add `gameState: GameState` property to `Game` class.
    -   Modify `initializeGameState()` (or constructor) to initialize `gameState`.
    -   Add/modify `updateBall()` to update `gameState` properties.
    -   Implement `movePaddle()` to update `gameState`.
    -   Modify `getGameState()` to return `gameState`.
    -   **Check:** Verify that `Game` class manages `GameState` correctly.
-   [x] **To-do 2.4.3: Send `GameState` to clients**
    -   In `backend/src/server.ts`, when client joins, emit initial `GameState`.
    -   Modify periodic game logic update to emit updated `GameState` to clients in the room.
    -   **Check:** Verify that initial `GameState` is sent and updates are broadcast periodically.

### Chunk 2.5: Core Game Mechanics

-   [x] **To-do 2.5.1: Implement paddle movement in `Game` class**
    -   In `Game` class, implement `movePaddle()` to update paddle positions within bounds.
    -   **Check:** Verify that paddle movement methods update positions correctly.
-   [x] **To-do 2.5.2: Implement ball-wall collision detection**
    -   In `updateBall()` method, implement collision detection for top and bottom walls, reversing `velocityY`.
    -   **Check:** Verify that the ball bounces correctly off top and bottom walls.
-   [x] **To-do 2.5.3: Implement ball-paddle collision detection**
    -   In `updateBall()`, implement collision detection for ball and paddles, reversing `velocityX` and adjusting `velocityY`.
    -   **Check:** Verify that the ball bounces correctly off paddles.
-   [x] **To-do 2.5.4: Implement scoring logic**
    -   In `updateBall()`, check if ball passes left/right edges, increment score, and reset ball to center.
    -   **Check:** Verify that scoring logic works and ball resets.

### Chunk 2.6: Socket.IO Event Handling for Game Logic

-   [x] **To-do 2.6.1: Handle `paddle-move` event**
    -   In `backend/src/server.ts`, add a `socket.on('paddleMove')` listener.
    -   Call `game.movePaddle()` and emit updated `gameState` to the room.
    -   **Check:** Verify server handles `paddleMove`, updates paddle, and broadcasts state.
-   [x] **To-do 2.6.2: Implement game loop**
    -   In `backend/src/server.ts`, start `gameManager.startGameLoop()` on `createGame` event.
    -   Ensure `GameManager.startGameLoop()` uses `setInterval` to call `game.updateBall()` and emit `gameState`.
    -   Implement `gameManager.stopGameLoopIfGameEmpty()` on `disconnect`.
    -   **Check:** Verify game loop starts/stops and broadcasts correctly.

### Chunk 2.7: Backend Testing

-   [x] **To-do 2.7.1: Manual testing of game logic**
    -   Run backend server. Use `index.html` or browser console to test `createGame`, `joinGame`, `paddleMove`, `gameState` updates, scoring, and disconnects.
    -   **Check:** Manually verify that game logic functions as expected.

## Phase 3: Frontend Development

### Chunk 3.1: Frontend Project Setup

-   [x] **To-do 3.1.1: Navigate to the `frontend` directory**
    -   Use the command line to navigate to the `frontend` directory: `cd frontend`
    -   **Check:** Verify that the current directory in the terminal is `frontend`.
-   [x] **To-do 3.1.2: Set up React with Vite**
    -   Run `npm create vite@latest . -- --template react-ts`.
    -   **Check:** Verify that a new React project is created in the `frontend` directory.
-   [x] **To-do 3.1.3: Install Socket.IO client**
    -   Install `socket.io-client`.
    -   **Check:** Verify that the `socket.io-client` library is installed.

### Chunk 3.2: Frontend Components

-   [x] **To-do 3.2.1: Create `Lobby` component**
    -   Create `frontend/src/components` directory and `Lobby.tsx` file.
    -   Implement `Lobby` with title, subtitle, name input, join button, and instructions.
    -   **Check:** Verify `Lobby` component displays correct UI.
-   [x] **To-do 3.2.2: Create `GameCanvas` component**
    -   Create `GameCanvas.tsx` and `GameCanvas.css`.
    -   Implement `GameCanvas` to render game area, using a `<canvas>` element for background/line and React components for dynamic elements.
    -   **Check:** Verify `GameCanvas` component is created and renders basic canvas/elements.
-   [x] **To-do 3.2.3: Create `Paddle` component**
    -   Create `Paddle.tsx` and `Paddle.css`.
    -   Implement `Paddle` to render a rectangle positioned with CSS.
    -   Update `GameCanvas.tsx` to use `Paddle` components.
    -   **Check:** Verify `Paddle` component renders correctly within `GameCanvas`.
-   [x] **To-do 3.2.4: Create `Ball` component**
    -   Create `Ball.tsx` and `Ball.css`.
    -   Implement `Ball` to render a circle positioned with CSS.
    -   Update `GameCanvas.tsx` to use `Ball` component.
    -   **Check:** Verify `Ball` component renders correctly within `GameCanvas`.
-   [x] **To-do 3.2.5: Create `Scoreboard` component**
    -   Create `Scoreboard.tsx` and `Scoreboard.css`.
    -   Implement `Scoreboard` to display scores (e.g., "First: 0 vs Second: 0").
    -   Update `Scoreboard.css` for desired styling and size (shorter/wider).
    -   **Check:** Verify `Scoreboard` component displays and updates scores correctly.
-   [x] **To-do 3.2.6: Create `ErrorMessage` component**
    -   Create `ErrorMessage.tsx` and `ErrorMessage.css`.
    -   Implement `ErrorMessage` to display server errors.
    -   **Check:** Verify `ErrorMessage` component can display and hide messages.

### Chunk 3.3: Socket.IO Integration (Frontend)

-   [x] **To-do 3.3.1: Connect to Socket.IO server**
    -   In `frontend/src/App.tsx`, import `io` function.
    -   Establish a connection to the backend server and store the `socket` instance in state.
    -   **Check:** Verify connection is established and `socket` instance is stored.
-   [x] **To-do 3.3.2: Handle `connect` and `disconnect` events**
    -   In `frontend/src/App.tsx`, add event listeners for `connect` and `disconnect`, logging messages.
    -   **Check:** Verify `connect` and `disconnect` events are handled.
-   [x] **To-do 3.3.3: Implement Game Creation/Joining Flow from Frontend**
    -   Modify `Lobby.tsx` to include Game ID input and separate "Create Game" / "Join Game" buttons.
    -   Modify `handleJoinGame` in `App.tsx` to emit `createGame` or `joinGame` based on user input, and handle connection establishment.
    -   **Check:** Verify correct events are emitted for game creation/joining.
-   [x] **To-do 3.3.4: Handle `game-start` event**
    -   In `frontend/src/App.tsx`, add an event listener for `gameCreated` and `joinedGame` events.
    -   Store `gameInfo` (gameId, playerNumber, playerName) in state.
    -   Switch the UI from `Lobby` to the game display (Scoreboard, GameCanvas, ErrorMessage) based on `inGame` state.
    -   **Check:** Verify UI switches and `gameInfo` is stored.

### Chunk 3.4: Real-Time Game State & Error Handling (Frontend)

-   [x] **To-do 3.4.1: Handle `gameState` event**
    -   In `frontend/src/App.tsx`, add an event listener for the `gameState` event (emitted periodically by the backend game loop).
    -   When this event is received, update the `gameState` state variable in `App.tsx` with the received data.
    -   Pass the `gameState` to the `GameCanvas` and `Scoreboard` components as props.
    -   **Check:**
        -   Verify that the `gameState` object is received by the frontend and its `ballX`, `ballY`, `player1PaddleY`, `player2PaddleY` properties update continuously in the browser console.
        -   Verify that the `GameCanvas` visually renders the moving ball and paddles, and `Scoreboard` visually updates scores based on this real-time data.
-   [x] **To-do 3.4.2: Handle `error` event**
    -   In `frontend/src/App.tsx`, add an event listener for the `error` event (emitted by the backend for failed joins, etc.).
    -   When this event is received, store the `data.message` in the `errorMessage` state variable.
    -   Ensure the `ErrorMessage` component is rendered with this `errorMessage`.
    -   **Check:**
        -   Verify that creating a game with 2 existing players (simulating third player join) causes an "Game is full" error to appear.
        -   Verify that attempting to join a non-existent game causes a "Game not found" error to appear.
        -   Verify that error messages clear when a new successful connection is made.

### Chunk 3.5: Player Input Handling (Frontend)

-   [ ] **To-do 3.5.1: Capture keyboard input for paddle movement**
    -   In `frontend/src/App.tsx` or `GameCanvas.tsx`, add event listeners for keyboard events (`keydown` and `keyup`) on the `window` or `document`.
    -   Identify specific keys that will control each player's paddle movement (e.g., 'w'/'s' for Player 1, 'ArrowUp'/'ArrowDown' for Player 2).
    -   Maintain a local state (e.g., a `Set` or boolean flags) to track which movement keys are currently being pressed.
    -   **Check:** Verify that keyboard input is detected and recognized in the browser console.
-   [ ] **To-do 3.5.2: Emit paddle movement to backend**
    -   Modify `frontend/src/App.tsx` to periodically (e.g., in a `requestAnimationFrame` loop or `setInterval`) emit the `'paddleMove'` Socket.IO event to the backend.
    -   The event should include: `gameId`, `deltaY` (calculated from pressed keys and `PADDLE_SPEED`), and the current player's `playerNumber` (from `gameInfo`).
    -   Only emit if keys are actually pressed and the client is in a game.
    -   **Check:**
        -   Verify that `paddleMove` events are emitted from the frontend when keys are pressed.
        -   Verify that the backend terminal logs the `paddleMove` event and shows the paddle's Y position updating for the correct player.
        -   Visually verify that controlling one paddle on one screen moves that specific paddle on both screens.

## Phase 4: Integration and Overall Testing

### Chunk 4.1: End-to-End Testing

-   [ ] **To-do 4.1.1: Comprehensive Player Joining and Game Flow Test**
    -   Start both backend and frontend servers.
    -   Open two browser windows.
    -   **Client 1:** Type name, click "Create New Game". Verify UI switch, game ID displayed, ball moving, and background paddles.
    -   **Client 2:** Type name, paste Game ID, click "Join Existing Game". Verify UI switch, ball and paddle synchronization, and both clients see the same game state.
    -   **Check:** Verify entire flow from joining to active gameplay works seamlessly for two players.
-   [ ] **To-do 4.1.2: Full Paddle Control Test**
    -   Using the two connected clients, control Player 1's paddle (e.g., with 'W'/'S'). Verify its movement on both screens.
    -   Control Player 2's paddle (e.g., with 'ArrowUp'/'ArrowDown'). Verify its movement on both screens.
    -   Test paddle boundaries.
    -   **Check:** Verify paddle controls are fully synchronized and respect boundaries.
-   [ ] **To-do 4.1.3: Ball Physics and Scoring Test**
    -   Observe multiple ball-wall collisions (top/bottom) and ball-paddle collisions. Verify bounces are realistic.
    -   Allow the ball to pass a paddle to trigger scoring. Verify scores update on both screens.
    -   Verify ball resets to center after a score.
    -   **Check:** Verify core game mechanics (bounces, scoring, reset) are accurate and synchronized.
-   [ ] **To-do 4.1.4: Error Handling Test**
    -   With two players active, open a third browser window, type name, paste Game ID, click "Join Existing Game". Verify "Game is full" error appears on Client 3 and it remains in the lobby.
    -   Attempt to join a random, non-existent Game ID. Verify "Game not found" error.
    -   **Check:** Verify all error conditions are handled and displayed correctly.
-   [ ] **To-do 4.1.5: Disconnection Handling Test**
    -   With two players in a game, close one client's tab. Verify the backend logs the disconnect and (if implemented) the game loop stops.
    -   Close the second client's tab. Verify all backend resources are cleaned up.
    -   **Check:** Verify player disconnections are handled gracefully and backend resources are freed.

## Phase 5: Polishing and User Experience

### Chunk 5.1: Visual Enhancements

-   [ ] **To-do 5.1.1: Improve Styling and Responsiveness**
    -   Review all CSS files (`Lobby.css`, `GameCanvas.css`, `Paddle.css`, `Ball.css`, `Scoreboard.css`, `ErrorMessage.css`).
    * Refine colors, fonts (e.g., "Inter"), shadows, and overall aesthetics for a professional look.
    * Ensure all components are visually appealing and have rounded corners.
    * Implement basic responsive design principles (e.g., fluid widths, media queries) to ensure the game looks good on various screen sizes (mobile, tablet, desktop).
    * **Check:** Visually confirm the game looks polished and is responsive across different screen sizes (try resizing your browser window).
-   [ ] **To-do 5.1.2: Add User Feedback**
    -   Implement visual cues for game events (e.g., small flash on screen when a point is scored, "Game Over" message).
    -   Consider adding simple sound effects for ball hits and scoring (using `tone.js` if desired, no external URLs).
    -   **Check:** Verify user feedback is clear and enhances the experience.
-   [ ] **To-do 5.1.3: Implement "Leave Game" Button**
    -   Add a "Leave Game" button to the game screen UI.
    -   When clicked, emit a Socket.IO event to the server to signal the player leaving the game.
    -   Handle this event on the backend to remove the player from the game and update relevant game state.
    -   On the frontend, switch the UI back to the Lobby screen.
    -   **Check:** Verify player can leave game gracefully, and both frontend/backend update correctly.

### Chunk 5.2: Code Quality and Maintainability

-   [ ] **To-do 5.2.1: Code Formatting and Linting**
    -   Set up and run a code formatter (e.g., Prettier) across the entire project (both `backend` and `frontend`).
    -   Ensure ESLint is configured with recommended TypeScript rules and run it to fix any linting errors.
    -   **Check:** Confirm consistent code style and no linting warnings/errors remain.
-   [ ] **To-do 5.2.2: Refactor Components and Logic**
    -   Review frontend and backend code for modularity, readability, and efficiency.
    -   Extract helper functions, abstract common patterns, and ensure clear separation of concerns.
    -   Ensure all relevant data types (`GameState`, etc.) are consistently used across the stack.
    -   **Check:** Confirm code is clean, well-structured, and easy to understand.
-   [ ] **To-do 5.2.3: Comprehensive Code Comments**
    -   Add clear and concise comments to complex logic, function headers, and key sections of code in both frontend and backend.
    -   **Check:** Ensure code is well-documented for future understanding.

## Phase 6: Final Review and Submission

### Chunk 6.1: Project Finalization

-   [ ] **To-do 6.1.1: Final End-to-End Test**
    -   Perform a full, comprehensive test of all game functionalities one last time from start to finish with two players.
    -   Address any last-minute bugs.
    -   **Check:** Confirm all features work perfectly and are free of critical bugs.
-   [ ] **To-do 6.1.2: Update `README.md`**
    -   Create or update the `README.md` file in your project's root directory.
    -   Include:
        -   Project Title & Description
        -   Screenshot/Gif of the game (optional, but highly recommended)
        -   Key Features
        -   Technologies Used
        -   Setup & Installation Instructions (for both backend and frontend)
        -   How to Run the Game
        -   Deployment instructions (if applicable)
        -   Credits/Acknowledgements
    -   **Check:** Verify `README.md` is complete, accurate, and easy to follow.
-   [ ] **To-do 6.1.3: Clean Production Build (Optional but Recommended)**
    -   For `backend`: `cd backend && npm run build` (This creates the `dist` folder).
    * For `frontend`: `cd frontend && npm run build` (This creates the `dist` folder).
    * **Check:** Ensure both builds complete successfully without errors.
-   [ ] **To-do 6.1.4: Final Git Commit and Push**
    -   Ensure all final changes are committed to your `main` branch.
    -   Push your `main` branch to your remote GitHub repository.
    -   **Check:** Verify your GitHub repository is up-to-date with all project code.
-   [ ] **To-do 6.1.5: Submission Preparation**
    -   Review all assignment requirements one last time.
    * Ensure all necessary files and instructions are in place for grading.
    * **Check:** Confirm project meets all submission criteria.