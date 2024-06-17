import { useEffect, useState, useCallback } from 'react';
import { calculateRecord, CalculateRecordResult } from '../components/utils'; // Assuming CalculateRecordResult is a type exported from utils
import { useUserInfo } from '../contexts/UserContext';
import { useGameData } from '../contexts/GameDataContext';
import { useGameStatus } from '../contexts/GameStatusContext';
import { useSocketClient } from '../contexts/SocketClientContext';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import { events, gameState } from '../components/constants';

type UseGameActionsProps = {
  selectedRoom: string; // Adjust as per your application's requirement
};

const useGameActions = ({ selectedRoom }: UseGameActionsProps) => {
  const socket = useSocketClient();
  const { username, socketId } = useUserInfo();
  const { gameData, setGameData } = useGameData();
  const { setIsWon, setIsLost } = useGameStatus();
  const {
    setDisabled,
    setWaitingForSecondUser,
    setWaitingForSecondUserToRespond,
  } = usePresentationLogic();

  const [number, setNumber] = useState<number>(0);

  const handleRandomNumber = useCallback(
    (data: {
      number: number;
      selectedNumber: number;
      user: string;
      isFirst: boolean;
      isCorrectResult: boolean;
    }) => {
      setWaitingForSecondUser(false);

      if (data.isFirst) {
        setNumber(Number(data.number));
        return;
      }

      if (data.user !== username) {
        const numberToUse = data.isCorrectResult ? number : data.number;
        const record: CalculateRecordResult = calculateRecord(
          numberToUse,
          data.selectedNumber,
          data.user
        );
        const roomData = gameData[selectedRoom];
        const updatedGameData = [...roomData, record];

        const lastRecord = roomData[roomData.length - 1];
        if (!lastRecord || lastRecord.result !== 1) {
          setGameData({ ...gameData, [selectedRoom]: updatedGameData });
          setDisabled(true);
        }
      }

      setNumber(Number(data.number));
      window.scrollTo(0, document.body.scrollHeight);
    },
    [
      gameData,
      selectedRoom,
      setGameData,
      username,
      number,
      setWaitingForSecondUser,
      setDisabled,
    ]
  );

  const handleActivateYourTurn = useCallback(
    (data: { user: string; state: string }) => {
      const isMePlaying =
        data.user === socketId && data.state === gameState.play;
      const isOtherUserWaiting =
        data.user !== socketId && data.state === gameState.wait;
      const isCurrentUserTurn = isMePlaying || isOtherUserWaiting;

      if (isMePlaying || isOtherUserWaiting) {
        setWaitingForSecondUserToRespond(false);
      }

      setDisabled(!isCurrentUserTurn);
    },
    [socketId, setDisabled, setWaitingForSecondUserToRespond]
  );

  const handleGameOver = useCallback(
    (data: { user: string; isOver: boolean }) => {
      setDisabled(true);
      setWaitingForSecondUserToRespond(false);
      setNumber(0);

      const hasCurrentUserWon = data.user === username && data.isOver;
      hasCurrentUserWon ? setIsWon(true) : setIsLost(true);
    },
    [
      username,
      setDisabled,
      setWaitingForSecondUserToRespond,
      setIsWon,
      setIsLost,
      setNumber,
    ]
  );

  useEffect(() => {
    socket.on(events.randomNumber, handleRandomNumber);
    socket.on(events.activateYourTurn, handleActivateYourTurn);
    socket.on(events.gameOver, handleGameOver);

    return () => {
      socket.off(events.randomNumber, handleRandomNumber);
      socket.off(events.activateYourTurn, handleActivateYourTurn);
      socket.off(events.gameOver, handleGameOver);
    };
  }, [socket, handleRandomNumber, handleActivateYourTurn, handleGameOver]);

  return { number };
};

export default useGameActions;
