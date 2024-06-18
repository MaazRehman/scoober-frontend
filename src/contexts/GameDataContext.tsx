import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useGetRoomsInfo from "../hooks/useGetRoomsInfo";

interface GameDataContextType {
  gameData: Record<string, any[]>;
  setGameData: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}

const GameDataContext = createContext<GameDataContextType | undefined>(
    undefined
);

interface GameDataProviderProps {
  children: ReactNode;
}

export const GameDataProvider: React.FC<GameDataProviderProps> = ({
                                                                    children,
                                                                  }) => {
  const { data:  rooms } = useGetRoomsInfo();
  const [gameData, setGameData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if ( rooms.length) {
      const initialGameData: Record<string, any[]> = {};
      rooms.forEach((room) => {
        initialGameData[room.name] = [];
      });
      setGameData(initialGameData);
    }
  }, [rooms]);

  return (
      <GameDataContext.Provider value={{ gameData, setGameData }}>
        {children}
      </GameDataContext.Provider>
  );
};

export const useGameData = (): GameDataContextType => {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};
