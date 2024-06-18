import React from 'react';
import useGameActions from '../../hooks/useGameActions';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { useGameStatus } from '../../contexts/GameStatusContext';
import { calculateRecord } from '../utils';
import { useGameData } from '../../contexts/GameDataContext';
import { useUserInfo } from '../../contexts/UserContext';
import { buttonValues, events } from '../constants';
import { Button } from 'antd';

const GameActions: React.FC = () => {
  const { setWaitingForSecondUserToRespond, disabled, setDisabled } =
    usePresentationLogic();
  const { gameData, setGameData } = useGameData();
  const socket = useSocketClient();
  const { username, selectedRoom } = useUserInfo();
  const { number } = useGameActions({ selectedRoom });
  const { isWon, isLost } = useGameStatus();

  const sendSelectedNumber = (selectedNumber: number) => {
    const isGameInProgress = !isWon && !isLost;
    if (isGameInProgress) {
      const record = calculateRecord(number, selectedNumber, username);
      const updatedGameData = [...gameData[selectedRoom], record];
      setGameData({ ...gameData, [selectedRoom]: updatedGameData });
      setDisabled(true);
      setWaitingForSecondUserToRespond(true);
      socket.emit(events.sendNumber, { number, selectedNumber });
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center' }} data-testid="number-display">
          {number || ''}
        </h2>
      </div>
      <div className="game-actions">
        {number
          ? buttonValues.map((value) => (
              <Button
                key={value}
                onClick={() => sendSelectedNumber(value)}
                disabled={!!disabled}
                data-testid={`button-${value}`}
              >
                {value > 0 ? `+${value}` : value}
              </Button>
            ))
          : ''}
      </div>
    </>
  );
};

export default GameActions;
