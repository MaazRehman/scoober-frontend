import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import reportWebVitals from './reportWebVitals';
import Game from './components/Game/Game';
import { SocketProvider } from './contexts/SocketClientContext';
import { UserInfoProvider } from './contexts/UserContext';
import { GameDataProvider } from './contexts/GameDataContext';
import { GameStatusProvider } from './contexts/GameStatusContext';
import { PresentationLogicProvider } from './contexts/PresentationLogicContext';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE as string
  ),
  // Session Replay
  replaysSessionSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE as string
  ),
  replaysOnErrorSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE as string
  ),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SocketProvider>
      <PresentationLogicProvider>
      <UserInfoProvider>
        <GameDataProvider>
          <GameStatusProvider>
              <Game />
          </GameStatusProvider>
        </GameDataProvider>
      </UserInfoProvider>
      </PresentationLogicProvider>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
