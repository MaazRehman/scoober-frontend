import React from 'react';
import './DecisionFrame.css';
import { Button } from 'antd';
import { useGameStatus } from '../../contexts/GameStatusContext';
import { useGameData } from '../../contexts/GameDataContext';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { events } from '../constants';

type DecisionFrameProps = {
  selectedRoom: string;
};

const DecisionFrame: React.FC<DecisionFrameProps> = ({ selectedRoom }) => {
  const socket = useSocketClient();
  const { isWon, setIsWon, setIsLost } = useGameStatus();
  const { gameData, setGameData } = useGameData();
  const {
    setWaitingForSecondUser,
    setWaitingForSecondUserToRespond,
    setDisabled,
  } = usePresentationLogic();

  const handleNewGameClick = () => {
    setWaitingForSecondUserToRespond(false);
    setGameData({ ...gameData, [selectedRoom]: [] });
    setIsWon(false);
    setIsLost(false);
    setDisabled(false);
    setWaitingForSecondUser(true);
    socket.emit(events.letsPlay);
  };

  return (
    <div className="overlay">
      <div className="decision-frame">
        <img
          src={isWon ? 'win.png' : 'lose.png'}
          alt={isWon ? 'You won' : 'You lose'}
        />
        <p>{isWon ? 'You won' : 'You lose'}</p>
        <Button onClick={handleNewGameClick}>New game</Button>
      </div>
    </div>
  );
};

export default DecisionFrame;
