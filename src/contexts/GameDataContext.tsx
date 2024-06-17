import React, { createContext, useContext, useState, ReactNode } from "react";
import { rooms } from "../components/constants";

interface GameDataContextType {
    gameData: Record<string, any[]>;
    setGameData: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}

const initialGameData: Record<string, any[]> = {};

rooms.forEach(room => {
    initialGameData[room.name] = [];
});

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

interface GameDataProviderProps {
    children: ReactNode;
}

export const GameDataProvider: React.FC<GameDataProviderProps> = ({ children }) => {
    const [gameData, setGameData] = useState(initialGameData);

    return (
        <GameDataContext.Provider value={{ gameData, setGameData }}>
    {children}
    </GameDataContext.Provider>
);
};

export const useGameData = (): GameDataContextType => {
    const context = useContext(GameDataContext);
    if (!context) {
        throw new Error("useGameData must be used within a GameDataProvider");
    }
    return context;
};
