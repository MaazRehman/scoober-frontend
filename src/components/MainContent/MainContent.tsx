import React from 'react';
import GameStep from '../GameStep/GameStep';
import GameActions from '../GameActions/GameActions';
import DecisionFrame from '../DecisionFrame/DecisionFrame';
import { useGameData } from '../../contexts/GameDataContext';
import { useGameStatus } from '../../contexts/GameStatusContext';
import Loader from '../Loader/Loader';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { useUserInfo } from '../../contexts/UserContext';
import { Divider } from 'antd';

export type StepData = {
  step: number;
  equation: string;
  result: number;
  username: string;
};

const MainContent: React.FC = () => {
  const { waitingForSecondUser, waitingForSecondUserToRespond } =
    usePresentationLogic();
  const { isWon, isLost } = useGameStatus();
  const { gameData } = useGameData();
  const { username, selectedRoom } = useUserInfo();

  const isGameEnded = isWon || isLost;
  const selectedGameDataForRoom: StepData[] = selectedRoom
    ? gameData[selectedRoom]
    : [];

  return (
    <main data-testid="main-content">
      <div className="main-innerbody">
        {isGameEnded ? (
          <DecisionFrame
            selectedRoom={selectedRoom}
            data-testid="decision-frame"
          />
        ) : (
          ''
        )}
        {selectedGameDataForRoom.map((stepData, index) => (
          <div key={index}>
            <GameStep
              step={stepData.step}
              equation={stepData.equation}
              result={stepData.result}
              username={stepData.username}
              index={index}
            />
            <Divider data-testid={`divider-${index}`} />
          </div>
        ))}
        {waitingForSecondUserToRespond && (
          <Loader tip="waiting for second user to play their turn" />
        )}
        {waitingForSecondUser && (
          <Loader tip="Waiting for the second user to join" />
        )}
        {username ? (
          <GameActions selectedRoom={selectedRoom} data-testid="game-actions" />
        ) : (
          ''
        )}
      </div>
    </main>
  );
};

export default MainContent;
