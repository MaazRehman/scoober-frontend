import React, { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io.connect(process.env.REACT_APP_SOCKET_SERVER_URL),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketClient = () => {
  return useContext(SocketContext);
};
