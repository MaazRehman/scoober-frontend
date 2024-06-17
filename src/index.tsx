import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import reportWebVitals from './reportWebVitals';
import Game from './components/Game/Game';
import { SocketProvider } from './contexts/SocketClientContext';
import { UserInfoProvider } from './contexts/UserContext';
import { GameDataProvider } from './contexts/GameDataContext';
import { GameStatusProvider } from './contexts/GameStatusContext';
import { PresentationLogicProvider } from './contexts/PresentationLogicContext';


Sentry.init({
  dsn: "https://eb28302d865bcdfcd7934192c966fb2b@o4507321812910080.ingest.de.sentry.io/4507321817694288",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
