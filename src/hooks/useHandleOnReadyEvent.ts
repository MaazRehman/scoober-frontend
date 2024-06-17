import { useEffect } from 'react';
import { useSocketClient } from '../contexts/SocketClientContext';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import { events } from '../components/constants';

const useHandleOnReadyEvent = () => {
  const socket = useSocketClient();
  const { setWaitingForSecondUserToRespond } = usePresentationLogic();

  useEffect(() => {
    const handleOnReady = () => {
      setWaitingForSecondUserToRespond(false);
      socket.emit(events.letsPlay);
    };

    socket.on(events.onReady, handleOnReady);

    return () => {
      socket.off(events.onReady, handleOnReady);
    };
  }, [socket, setWaitingForSecondUserToRespond]);
};

export default useHandleOnReadyEvent;
