### Epic: Scoober Frontend Challenge

#### Story: Project Setup
- **Task: Initialize the Project**
    - Description: Set up the project using Create React App with TypeScript, and configure ESLint and Prettier.
    - Status: Complete

- **Task: Set Up Folder Structure**
    - Description: Create a well-defined folder structure for components, contexts, hooks, and utils.
    - Status: Complete

- **Task: Install Necessary Dependencies**
    - Description: Install dependencies like `socket.io-client`, `axios`, and a UI library.
    - Status: Complete

#### Story: Authentication
- **Task: Create Login Component**
    - Description: Develop a login form to authenticate players.
    - Status: Complete

- **Task: Implement User Context**
    - Description: Set up context to manage and store user authentication state globally.
    - Status: Complete

#### Story: Game Setup
- **Task: Develop Home Component**
    - Description: Allow users to select between playing against another player or the CPU.
    - Status: Complete

- **Task: Implement Room Selection**
    - Description: List available rooms fetched from the fake API and allow users to join a room.
    - Status: pending

#### Story: Game Logic
- **Task: Create Game Component**
    - Description: Display the current number and options to add -1, 0, or 1. Show the opponent’s move and the resulting number.
    - Status: Complete

- **Task: Handle Turns and Game State with Context**
    - Description: Implement logic to handle turns and update the game state using Context API.
    - Status: Complete

#### Story: CPU Logic
- **Task: Implement CPU Move Logic**
    - Description: Develop logic for CPU moves automatically based on the game's rules.
    - Status: Complete

#### Story: State Management with Context API
- **Task: Set Up User Context**
    - Description: Create a context provider to manage user state.
    - Status: Complete

- **Task: Set Up Game Data Context**
    - Description: Create a context provider to manage game state.
    - Status: Complete

- **Task: Set Up Socket Client Context**
    - Description: Create a context provider to manage socket connections and events.
    - Status: Complete

#### Story: Socket.io Integration
- **Task: Create Socket Service**
    - Description: Create a service to manage socket connections and events throughout applications.
    - Status: Complete

- **Task: Implement Event Handling**
    - Description: Handle socket events such as `randomNumber`, `activateYourTurn`, `gameOver`, etc.
    - Status: Complete

#### Story: UI Implementation
- **Task: Develop UI Components**
    - Description: Use the provided Figma design to create UI components.
    - Status: Complete

- **Task: Ensure Responsive Design**
    - Description: Implement responsive design for different screen sizes.
    - Status: Partially Complete

#### Story: API Integration
- **Task: Fetch Rooms and Users**
    - Description: Use axios to interact with the fake JSON server for fetching rooms and user data.
    - Status: Complete

- **Task: Implement Error Handling**
    - Description: Implement error handling for API requests and socket events.
    - Status: Complete

#### Story: Testing
- **Task: Write Unit Tests**
    - Description: Write unit tests for critical components and logic using Jest.
    - Status: Complete

- **Task: Conduct Integration Tests**
    - Description: Test the overall flow of the game, including user login, room joining, and game interactions.
    - Status: Complete

#### Story: Final Touches
- **Task: Polish UI and Add Animations**
    - Description: Add final UI polish and animations if necessary.
    - Status: Complete

- **Task: Document the Codebase**
    - Description: Document the codebase and setup instructions in README.md.
    - Status: Complete
