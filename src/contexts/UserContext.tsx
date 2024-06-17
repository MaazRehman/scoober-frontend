import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type UserContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  socketId: string;
  setSocketId: Dispatch<SetStateAction<string>>;
  selectedRoom: string;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserInfoProviderProps {
  children: ReactNode;
}

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const [username, setUsername] = useState<string>('');
  const [socketId, setSocketId] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        socketId,
        setSocketId,
        selectedRoom,
        setSelectedRoom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
