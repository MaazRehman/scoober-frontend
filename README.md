# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


#### Tech Improvements

- Add an `.nvmrc` file to switch to recommended version for node by repository owners.
- Integrate sentry in the project
- Move the code from javascript to typescript for better type support , abstraction and readability.
- Add prettier, linter and static validator on pre-commit hook

## Pre-Install
The project requires node `v18.18.0` or above. There is a `.nvmrc` file which specified recommended version of node .
Run in react-app folder
1. `nvm install 18.18.0`
2. `nvm use`


## Installation
For installation please run
`yarn install` 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Please make sure** socket server is listening on port `8082` and fake api server is also up on port `3004`. 
**These projects can be found here**
https://github.com/takeaway/scoober-fe-challenge-starter

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Demo
#### Against CPU

https://github.com/MaazRehman/scoober-frontend/assets/25147055/d2be1b7d-bab1-428b-92c9-83a90a9cf467

#### Multiplayer 

https://github.com/MaazRehman/scoober-frontend/assets/25147055/18bb946c-6b04-4cbd-8faa-13933d96f48b

## Next steps
- [ ] Add graceful exit if a person leaves the room in the middle of the game
- [ ] Add a condition of the server to handle only max of 2 people can join a human type room
- [ ] The rooms are currently hard coded in a const file , we can make it dynamic via api
- [ ] The page is rendered on the client side , ideally we can move this to server side for better loadtime and better SEO access.
- [ ] Add lint-staged so that prettier changes can be staged on pre-commit hook
- [ ] Add an e2e test to capture the journey using cypress so that we can also test e2e journey
- [ ] The bundle size is relatively small but if it tends to grow then we can add code splitting
- [ ] Setup alerts using sentry
- [ ] Add a PR template to project so that each pull request has a template.
- [ ] Make main branch as protected
- [ ] Setup CICD for the project


