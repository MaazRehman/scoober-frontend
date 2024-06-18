import { useEffect, useCallback } from 'react';
import { useUserInfo } from '../contexts/UserContext';
import { useSocketClient } from '../contexts/SocketClientContext';

type MessageData = {
  message: string;
  user: string;
  socketId: string;
};

/**
 * Custom hook to handle incoming messages from the socket.
 * On successful login this hook captures socketId of current user for later usage
 * @returns {void}
 */
const useHandleMessage = () => {
  const { setSocketId } = useUserInfo();
  const socket = useSocketClient();

  /**
   * Handles incoming message data and sets the socket ID if the message contains a welcome message.
   *
   * @param {MessageData} data - The data received from the socket.
   */
  const handleMessage = useCallback(
    (data: MessageData) => {
      if (data.message.includes(`Welcome ${data.user}`)) {
        setSocketId(data.socketId);
      }
    },
    [setSocketId]
  );

  useEffect(() => {
    /**
     * Handles incoming socket messages and calls handleMessage.
     *
     * @param {MessageData} data - The data received from the socket.
     */
    const handleSocketMessage = (data: MessageData) => {
      handleMessage(data);
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, [socket, handleMessage]);
};

export default useHandleMessage;
