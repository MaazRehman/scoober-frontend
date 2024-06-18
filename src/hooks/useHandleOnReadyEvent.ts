import { useEffect } from 'react';
import { useSocketClient } from '../contexts/SocketClientContext';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import { events } from '../components/constants';

/**
 * Custom hook to handle the "onReady" event from the socket.
 * When onReady is received , letsPlay is fired
 * @returns {void}
 */
const useHandleOnReadyEvent = () => {
  const socket = useSocketClient();
  const { setWaitingForSecondUserToRespond } = usePresentationLogic();

  useEffect(() => {
    /**
     * Handles the "onReady" event by updating the presentation logic state and emitting the "letsPlay" event.
     */
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
