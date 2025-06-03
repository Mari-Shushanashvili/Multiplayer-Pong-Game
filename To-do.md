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
    -   Command: `npm install express socket.io cors`
    -   **Check:** Verify that the dependencies are installed by checking the `node_modules` directory in `backend` and the `dependencies` section in `backend/package.json`.
-   [x] **To-do 2.1.4: Install TypeScript development dependencies**
    -   Install the following development dependencies:
        -   `typescript`: For using TypeScript.
        -   `ts-node`: For running TypeScript files directly during development.
        -   `nodemon`: For automatically restarting the server on code changes.
        -   `@types/node`: TypeScript type definitions for Node.js.
        -   `@types/express`: TypeScript type definitions for Express.
        -   `@types/socket.io`: TypeScript type definitions for Socket.IO.
    -   Command: `npm install -D typescript ts-node nodemon @types/node @types/express @types/socket.io`
    -   **Check:** Verify that the dev dependencies are installed by checking the `node_modules` directory in `backend` and the `devDependencies` section in `backend/package.json`.
-   [x] **To-do 2.1.5: Configure TypeScript**
    -   Create a `tsconfig.json` file in the `backend` directory.
    -   **Check:** Verify that the `tsconfig.json` file is created in the `backend` directory and contains the specified configuration.
-   [x] **To-do 2.1.6: Update `package.json` scripts**
    -   Open the `backend/package.json` file.
    -   Modify the `scripts` section to include:
        "scripts": {
          "dev": "nodemon src/server.ts",
          "build": "tsc",
          "start": "node dist/server.js"
        }
    -   **Check:** Verify that the `scripts` section in `backend/package.json` is updated correctly.

### Chunk 2.2: Basic Express and Socket.IO Setup

-   [x] **To-do 2.2.1: Create `backend/src/server.ts`**
    -   Create a `src` directory inside the `backend` directory.
    -   Create a `server.ts` file inside the `src` directory.
    -   **Check:** Verify that the `src` directory and the `server.ts` file are created in the correct locations.
-   [x] **To-do 2.2.2: Implement basic Express server**
-   [x] **To-do 2.2.3: Integrate Socket.IO**
    -   Modify `backend/src/server.ts` to integrate Socket.IO
    -   **Check:** Verify that the code is modified in `backend/src/server.ts` correctly, including the `http` and `socket.io` imports, server creation, and Socket.IO server initialization.
-   [x] **To-do 2.2.4: Handle `connect` and `disconnect` events**
    -   **Check:** Verify that the `connect` and `disconnect` event handlers are added correctly within the `io.on('connection', ...)` block.
-   [x] **To-do 2.2.5: Handle `player-join` event**
    -   **Check:** Verify that the `player-join` event handler is added correctly within the `io.on('connection', ...)` block.
-   [x] **To-do 2.2.6: Test basic Socket.IO connection (Manual)**
    -   Run the backend server using `npm run dev` in the `backend` directory.
    -   Use a Socket.IO client (e.g., a simple HTML page with Socket.IO client included via CDN, or a tool like Postman with Socket.IO plugin) to connect to the server.
    -   Observe the console logs on the backend to verify that `connect` and `disconnect` events are logged correctly.
    -   Emit a `player-join` event from the client with a player name and verify that the server logs the name correctly.
    -   **Check:** Verify that the server logs the connection, disconnection, and player join events correctly in the terminal.

### Chunk 2.3: Game Session Management

-   [x] **To-do 2.3.1: Create `GameManager` class**
    -   Create a new directory `backend/src/gameManagement`.
    -   Create a new file `backend/src/gameManagement/GameManager.ts`.
    -   Define a `GameManager` class.
    -   This class should manage multiple game sessions (rooms) and store `Game` instances.
    -   **Check:** Verify that the directory and files are created and the `GameManager` class is defined.
-   [x] **To-do 2.3.2: Implement `createGame()` method**
    -   In the `GameManager` class, implement a `createGame()` method.
    -   This method should:
        -   Create a new `Game` instance.
        -   Generate a unique `gameId` (e.g., using `uuid` library).
        -   Store the `Game` instance in a data structure (e.g., a `Map`) with the `gameId` as the key.
        -   Return the generated `gameId`.
    -   **Check:** Verify that the `createGame()` method creates a `Game` instance, generates a unique `gameId`, stores it, and returns the `gameId`.
-   [x] **To-do 2.3.3: Implement `joinGame()` method**
    -   In the `GameManager` class, implement a `joinGame()` method.
    -   This method should:
        -   Take a `gameId` and a `playerId` as arguments.
        -   Retrieve the `Game` instance associated with the `gameId` from the storage.
        -   If the `Game` instance exists and has less than two players, add the `playerId` to the `Game` instance.
        -   Assign a player number (1 or 2) to the joining player.
        -   If the game is full, return an error message.
        -   If the `Game` instance does not exist, return an error message.
    -   **Check:** Verify that the `joinGame()` method correctly handles joining players, assigns player numbers, and handles full or non-existent games.
-   [x] **To-do 2.3.4: Modify Socket.IO event handling in server.ts**
    -   In `backend/src/server.ts`:
        -   Import the `GameManager` class.
        -   Create an instance of `GameManager`.
        -   Implement a Socket.IO event listener for `'createGame'`:
            -   When a client emits `'createGame'`, call the `createGame()` method of the `GameManager`.
            -   Emit a `'gameCreated'` event to the client with the generated `gameId`.
            -   Have the client join a Socket.IO room with the `gameId` (using `socket.join(gameId)`).
        -   Implement a Socket.IO event listener for `'joinGame'`:
            -   When a client emits `'joinGame'` with a `gameId`, call the `joinGame()` method of the `GameManager`.
            -   If `joinGame()` is successful, emit a `'joinedGame'` event to the client with the assigned player number.
            -   If `joinGame()` fails, emit an `'error'` event to the client with an appropriate error message.
    -   **Check:** Verify that the `'createGame'` and `'joinGame'` events are handled correctly, game IDs are generated, clients join rooms, and errors are handled.

### Chunk 2.4: Core Game State Management

-   [x] **To-do 2.4.1: Define `GameState` interface**
    -   Create a new directory `backend/src/types`.
    -   Create a new file `backend/src/types/GameState.ts`.
    -   Define a `GameState` interface to represent the current state of the game.
    -   This interface should include properties for:
        -   Positions of paddles (e.g., `paddle1Y`, `paddle2Y`).
        -   Position of the ball (`ballX`, `ballY`).
        -   Scores of players (`player1Score`, `player2Score`).
        -   Game status (e.g., `active`, `gameOver`).
    -   **Check:** Verify that the `GameState` interface is defined with the correct properties.
-   [x] **To-do 2.4.2: Update `Game` class to manage `GameState`**
    -   In the `Game` class in `backend/src/game/Game.ts`:
        -   Add a `gameState`: `GameState` property to the class.
        -   Modify the `initialize()` method (or constructor) to initialize the `gameState` with appropriate starting values.
        -   Modify the `updateBall()` method to update the `gameState` properties (ball position, scores) instead of directly manipulating variables.
        -   Implement methods to update paddle positions within the `Game` class (e.g., `movePaddle1(deltaY: number)`, `movePaddle2(deltaY: number)`) and update the `gameState` accordingly.
        -   Modify the `getGameState()` method to return the `gameState` object.
    -   **Check:** Verify that the `Game` class manages the `GameState` correctly, including initialization, updating ball and paddle positions, and providing the current state.
-   [ ] **To-do 2.4.3: Send `GameState` to clients**
    -   In `backend/src/server.ts`:
        -   When a new client connects, emit the current `GameState` to that client using a `gameState` event.
        -   Modify the periodic game logic update to emit the updated `GameState` to all connected clients in the room using `io.to(gameId).emit('gameState', gameState)`.
    -   **Check:** Verify that the initial `GameState` is sent to new clients and that the updated `GameState` is broadcast to all clients in the room periodically.

### Chunk 2.5: Core Game Mechanics

-   [x] **To-do 2.5.1: Implement paddle movement in `Game` class**
    -   In the `Game` class, implement methods to update the paddle positions (e.g., `movePaddle1(deltaY: number)`, `movePaddle2(deltaY: number)`).
    -   Ensure that the paddle's new position stays within the bounds of the game area.
    -   **Check:** Verify that the paddle movement methods update the paddle positions correctly and prevent them from going out of bounds.
-   [x] **To-do 2.5.2: Implement ball-wall collision detection**
    -   In the `updateBall()` method of the `Game` class, implement collision detection for the top and bottom walls.
    -   When a collision occurs, reverse the `velocityY` of the ball.
    -   **Check:** Verify that the ball bounces correctly off the top and bottom walls.
-   [x] **To-do 2.5.3: Implement ball-paddle collision detection**
    -   In the `updateBall()` method, implement collision detection for the ball and the paddles.
    -   When a collision occurs, reverse the `velocityX` of the ball.
    -   Consider adding logic to adjust the `velocityY` based on where the ball hits the paddle.
    -   **Check:** Verify that the ball bounces correctly off the paddles.
-   [ ] **To-do 2.5.4: Implement scoring logic**
    -   In the `updateBall()` method, implement logic to check if the ball has passed the left or right edges of the game area.
    -   If the ball passes the left edge, increment the right player's score. If it passes the right edge, increment the left player's score.
    -   Reset the ball to the center of the game area after a score.
    -   Update the `gameState` with the new scores.
    -   **Check:** Verify that the scoring logic works correctly and the ball resets after a score.

### Chunk 2.6: Socket.IO Event Handling for Game Logic

-   [ ] **To-do 2.6.1: Handle `paddle-move` event**
    -   In `backend/src/server.ts`, add a Socket.IO event listener for the `paddle-move` event.
    -   The event data should include:
        -   `gameId`: The ID of the game being played.
        -   `playerId`: The ID of the player moving the paddle.
        -   `deltaY`: The amount the paddle should move vertically.
    -   Call the appropriate paddle movement method in the `Game` class (e.g., `movePaddle1()`, `movePaddle2()`).
    -   After updating the paddle position, emit the updated `gameState` to all clients in the room.
    -   **Check:** Verify that the server correctly receives and handles the `paddle-move` event, updates the paddle position, and broadcasts the new game state.
-   [ ] **To-do 2.6.2: Implement game loop**
    -   In `backend/src/server.ts`, implement a game loop using `setInterval` to periodically call the `updateBall()` method of the `Game` class for each active game.
    -   The game loop should also emit the updated `gameState` to all clients in the room after updating the ball's position.
    -   **Check:** Verify that the game loop is running and that the ball's position is updated and broadcast to clients at the correct interval.

### Chunk 2.7: Backend Testing

-   [ ] **To-do 2.7.1: Manual testing of game logic**
    -   Start the backend server.
    -   Use a Socket.IO client (e.g., a simple HTML page or a Socket.IO client library) to:
        -   Connect to the server.
        -   Simulate paddle movements by emitting the `paddle-move` event.
        -   Observe the `gameState` updates from the server to verify that paddle movements, ball movement, and scoring are working correctly.
    -   **Check:** Manually verify that the game logic is functioning as expected by observing the server's behavior and the `gameState` updates.

## Phase 3: Frontend Development

### Chunk 3.1: Frontend Project Setup

-   [ ] **To-do 3.1.1: Navigate to the `frontend` directory**
    -   Use the command line to navigate to the `frontend` directory: `cd frontend`
    -   **Check:** Verify that the current directory in the terminal is `frontend`.
-   [ ] **To-do 3.1.2: Set up React with Vite**
    -   Run the following command to create a new React project with TypeScript using Vite:
        ```bash
        npm create vite@latest . -- --template react-ts
        ```
    -   **Check:** Verify that a new React project is created in the `frontend` directory.
-   [ ] **To-do 3.1.3: Install Socket.IO client**
    -   Install the Socket.IO client library: `npm install socket.io-client`
    -   **Check:** Verify that the `socket.io-client` library is installed by checking the `node_modules` directory in `frontend` and the `dependencies` section in `frontend/package.json`.

### Chunk 3.2: Frontend Components

-   [ ] **To-do 3.2.1: Create `Lobby` component**
    -   Create a new directory `frontend/src/components`.
    -   Create a new file `frontend/src/components/Lobby.tsx`.
    -   Implement the `Lobby` component.
    -   This component should include:
        -   A title (e.g., "Ping Pong").
        -   A subtitle (e.g., "Multiplayer Game").
        -   An input field for the player's name.
        -   A button to join the game.
        -   Instructions on how to play.
    -   **Check:** Verify that the `Lobby` component is created and displays the correct UI elements.
-   [ ] **To-do 3.2.2: Create `GameCanvas` component**
    -   Create a new file `frontend/src/components/GameCanvas.tsx`.
    -   Implement the `GameCanvas` component.
    -   This component will be responsible for rendering the game elements (paddles, ball, game area).
    -   Use a `<canvas>` element or SVG for rendering.
    -   **Check:** Verify that the `GameCanvas` component is created and a `<canvas>` element or SVG is present.
-   [ ] **To-do 3.2.3: Create `Paddle` component**
    -   Create a new file `frontend/src/components/Paddle.tsx`.
    -   Implement the `Paddle` component.
    -   This component should render a rectangle representing a paddle.
    -   **Check:** Verify that the `Paddle` component is created and renders a rectangle.
-   [ ] **To-do 3.2.4: Create `Ball` component**
    -   Create a new file `frontend/src/components/Ball.tsx`.
    -   Implement the `Ball` component.
    -   This component should render a circle or a rectangle representing the ball.
    -   **Check:** Verify that the `Ball` component is created and renders a circle or rectangle.
-   [ ] **To-do 3.2.5: Create `Scoreboard` component**
    -   Create a new file `frontend/src/components/Scoreboard.tsx`.
    -   Implement the `Scoreboard` component.
    -   This component should display the scores of both players (e.g., "First: 0 vs Second: 0").
    -   **Check:** Verify that the `Scoreboard` component is created and displays the scores correctly.
-   [ ] **To-do 3.2.6: Create `ErrorMessage` component**
    -   Create a new file `frontend/src/components/ErrorMessage.tsx`.
    -   Implement the `ErrorMessage` component.
    -   This component should display error messages received from the server.
    -   **Check:** Verify that the `ErrorMessage` component is created and can display a given error message.

### Chunk 3.3: Socket.IO Integration (Frontend)

-   [ ] **To-do 3.3.1: Connect to Socket.IO server**
    -   In `frontend/src/App.tsx`, import the `io` function from `socket.io-client`.
    -   Establish a connection to the backend server (e.g., `const socket = io('http://localhost:3001');`).
    -   Store the `socket` instance in a state variable for later use.
    -   **Check:** Verify that the connection to the server is established and the `socket` instance is stored in the state.
-   [ ] **To-do 3.3.2: Handle `connect` and `disconnect` events**
    -   In `frontend/src/App.tsx`, add event listeners for the `connect` and `disconnect` events.
    -   Log messages to the console when these events occur.
    -   Potentially update the UI to reflect the connection status.
    -   **Check:** Verify that the `connect` and `disconnect` events are handled and logged correctly.
-   [ ] **To-do 3.3.3: Emit `player-join` event**
    -   In the `Lobby` component, when the player clicks the "Join Game" button, emit a `player-join` event to the server, sending the player's name as data.
    -   **Check:** Verify that the `player-join` event is emitted with the player's name when the button is clicked.
-   [ ] **To-do 3.3.4: Handle `game-start` event**
    -   In `frontend/src/App.tsx`, add an event listener for the `game-start` event.
    -   When this event is received, it should contain the initial game state (e.g., paddle positions, ball position, scores).
    -   Store this initial game state in a state variable.
    -   Potentially switch the UI from the `Lobby` to the `GameCanvas` component.
    -   **Check:** Verify that the `game-start` event is handled, the initial game state is received, and the UI is updated accordingly.
-   [ ] **To-do 3.3.5: Handle `game-state` event**
    -   In `frontend/src/App.tsx`, add an event listener for the `game-state` event.
    -   When this event is received, it should contain the updated game state.
    -   Update the game state variable in `App.tsx` with the received data.
    -   Pass the game state to the `GameCanvas` component as props.
    -   **Check:** Verify that the `game-state` event is handled and the game state is updated correctly.
-   [ ] **To-do 3.3.6: Handle `error` event**
    -   In `frontend/src/App.tsx`, add an event listener for the `error` event.
    -   When this event is received, display the error message in the `ErrorMessage` component.
    -   **Check:** Verify that the `error` event is handled and the error message is displayed in the UI.
-   [ ] **To-do 3.3.7: Emit `paddle-move` event**
    -   In the `GameCanvas` component, capture keyboard input for paddle movement.
    -   When a relevant key is pressed, emit a `paddle-move` event to the server, including the direction of movement.
    -   **Check:** Verify that the `paddle-move` event is emitted with the correct data when the player presses a movement key.

### Chunk 3.4: Rendering Game Elements

-   [ ] **To-do 3.4.1: Render paddles**
    -   In the `GameCanvas` component, render the paddles based on the paddle positions received in the `gameState` prop.
    -   Use the `<canvas>` API or SVG to draw rectangles for the paddles.
    -   Apply styles (e.g., color, width, height) to the paddles.
    -   **Check:** Verify that the paddles are rendered at the correct positions with the correct styles.
-   [ ] **To-do 3.4.2: Render ball**
    -   In the `GameCanvas` component, render the ball based on the ball position received in the `gameState` prop.
    -   Use the `<canvas>` API or SVG to draw a circle or rectangle for the ball.
    -   Apply styles (e.g., color, radius) to the ball.
    -   **Check:** Verify that the ball is rendered at the correct position with the correct styles.
-   [ ] **To-do 3.4.3: Render score**
    -   In the `Scoreboard` component, display the scores of both players.
    -   Receive the scores as props.
    -   Apply styles to the score display.
    -   **Check:** Verify that the scores are displayed correctly and updated when they change.

## Phase 4: Integration and Testing

### Chunk 4.1: Integration Testing

-   [ ] **To-do 4.1.1: Test player joining**
    -   Start both the backend and frontend servers.
    -   Open two browser windows.
    -   In each window, enter a player name and click "Join Game".
    -   Verify that both players are connected and the game starts.
    -   **Check:** Verify that players can join the game and their names are displayed (if implemented).
-   [ ] **To-do 4.1.2: Test paddle movement**
    -   In the two browser windows, use the keyboard to control the paddles.
    -   Verify that the paddles move smoothly and in real-time for both players.
    -   **Check:** Verify that paddle movement is synchronized between players and that the paddles stay within the game bounds.
-   [ ] **To-do 4.1.3: Test ball movement and collision**
    -   Observe the ball's movement and collision with the walls and paddles.
    -   Verify that the ball bounces correctly and changes direction.
    -   **Check:** Verify that the ball's movement and collision detection are accurate and realistic.
-   [ ] **To-do 4.1.4: Test scoring**
    -   Allow players to score points by missing the ball.
    -   Verify that the scores are updated correctly for both players.
    -   **Check:** Verify that the scoring logic works as expected and the scores are displayed correctly.
-   [ ] **To-do 4.1.5: Test error handling**
    -   Try to join a game with more than two players (if you implemented this).
    -   Verify that the appropriate error message is displayed.
    -   **Check:** Verify that error messages are displayed correctly in the UI.

### Chunk 4.2: Bug Fixing

-   [ ] **To-do 4.2.1: Identify and document bugs**
    -   During testing, carefully note down any bugs or unexpected behavior.
    -   Document the steps to reproduce the bug.
    -   **Check:** Create a list of all identified bugs with clear descriptions.
-   [ ] **To-do 4.2.2: Fix bugs**
    -   Fix the bugs identified in the previous step.
    -   Test each fix to ensure it resolves the issue and doesn't introduce new bugs.
    -   **Check:** Verify that all identified bugs are fixed and the game functions correctly.

### Chunk 4.3: Code Cleanup and Documentation

-   [ ] **To-do 4.3.1: Code cleanup**
    -   Remove any unnecessary code, comments, or console logs.
    -   Ensure consistent code formatting and style.
    -   **Check:** Verify that the code is clean, readable, and well-formatted.
-   [ ] **To-do 4.3.2: Documentation**
    -   Write basic documentation for your project.
    -   Include:
        -   Project description
        -   Setup instructions
        -   Explanation of the main components and functionality
    -   **Check:** Verify that the documentation is clear, concise, and covers the necessary information.

### Chunk 4.4: Final Submission

-   [ ] **To-do 4.4.1: Prepare for submission**
    -   Package your project for submission according to the assignment instructions.
    -   **Check:** Verify that the project is packaged correctly and meets all submission requirements.
