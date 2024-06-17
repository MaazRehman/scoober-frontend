import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Game from './components/Game/Game';
import { SocketProvider } from './contexts/SocketClientContext';
import { UserInfoProvider } from './contexts/UserContext';
import { GameDataProvider } from './contexts/GameDataContext';
import { GameStatusProvider } from './contexts/GameStatusContext';
import { PresentationLogicProvider } from './contexts/PresentationLogicContext';

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <UserInfoProvider>
        <GameDataProvider>
          <GameStatusProvider>
            <PresentationLogicProvider>
              <Game />
            </PresentationLogicProvider>
          </GameStatusProvider>
        </GameDataProvider>
      </UserInfoProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
