import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface GameStatusContextType {
    isWon: boolean;
    setIsWon: Dispatch<SetStateAction<boolean>>;
    isLost: boolean;
    setIsLost: Dispatch<SetStateAction<boolean>>;
}
const defaultValue = {isWon: false, isLost : false, setIsWon : ()=>{}, setIsLost: ()=>{}}
const GameStatusContext = createContext<GameStatusContextType>(defaultValue);

interface GameStatusProviderProps {
    children: ReactNode;
}

export const GameStatusProvider: React.FC<GameStatusProviderProps> = ({ children }) => {
    const [isWon, setIsWon] = useState<boolean>(false);
    const [isLost, setIsLost] = useState<boolean>(false);

    return (
        <GameStatusContext.Provider value={{ isWon, setIsWon, isLost, setIsLost }}>
            {children}
        </GameStatusContext.Provider>
    );
};

export const useGameStatus = (): GameStatusContextType => {
    return useContext(GameStatusContext);
};
