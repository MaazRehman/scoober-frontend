import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DecisionFrame from './DecisionFrame';
import { useGameStatus } from '../../contexts/GameStatusContext';
import { useGameData } from '../../contexts/GameDataContext';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { events } from '../constants';

jest.mock('../../contexts/GameStatusContext');
jest.mock('../../contexts/GameDataContext');
jest.mock('../../contexts/SocketClientContext');
jest.mock('../../contexts/PresentationLogicContext');

const mockUseGameStatus = useGameStatus as jest.Mock;
const mockUseGameData = useGameData as jest.Mock;
const mockUseSocketClient = useSocketClient as jest.Mock;
const mockUsePresentationLogic = usePresentationLogic as jest.Mock;

describe('<DecisionFrame />', () => {
    const selectedRoom = 'Amesterdam';
    const socketEmit = jest.fn();

    beforeEach(() => {
        mockUseGameStatus.mockReturnValue({
            isWon: false,
            setIsWon: jest.fn(),
            setIsLost: jest.fn(),
        });

        mockUseGameData.mockReturnValue({
            gameData: {},
            setGameData: jest.fn(),
        });

        mockUseSocketClient.mockReturnValue({
            emit: socketEmit,
        });

        mockUsePresentationLogic.mockReturnValue({
            setWaitingForSecondUser: jest.fn(),
            setWaitingForSecondUserToRespond: jest.fn(),
            setDisabled: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render DecisionFrame with lose state', () => {
        render(<DecisionFrame selectedRoom={selectedRoom} />);

        expect(screen.getByAltText('You lose')).toBeInTheDocument();
        expect(screen.getByText('You lose')).toBeInTheDocument();
    });

    it('renders DecisionFrame with win state', () => {
        mockUseGameStatus.mockReturnValueOnce({
            isWon: true,
            setIsWon: jest.fn(),
            setIsLost: jest.fn(),
        });

        render(<DecisionFrame selectedRoom={selectedRoom} />);

        expect(screen.getByAltText('You won')).toBeInTheDocument();
        expect(screen.getByText('You won')).toBeInTheDocument();
    });

    it('clicking New game button calls the appropriate methods', () => {
        const mockSetWaitingForSecondUserToRespond = jest.fn();
        const mockSetGameData = jest.fn();
        const mockSetIsWon = jest.fn();
        const mockSetIsLost = jest.fn();
        const mockSetDisabled = jest.fn();
        const mockSetWaitingForSecondUser = jest.fn();

        mockUseGameStatus.mockReturnValue({
            isWon: false,
            setIsWon: mockSetIsWon,
            setIsLost: mockSetIsLost,
        });

        mockUseGameData.mockReturnValue({
            gameData: {},
            setGameData: mockSetGameData,
        });

        mockUsePresentationLogic.mockReturnValue({
            setWaitingForSecondUser: mockSetWaitingForSecondUser,
            setWaitingForSecondUserToRespond: mockSetWaitingForSecondUserToRespond,
            setDisabled: mockSetDisabled,
        });

        render(<DecisionFrame selectedRoom={selectedRoom} />);

        const button = screen.getByText('New game');
        fireEvent.click(button);

        expect(mockSetWaitingForSecondUserToRespond).toHaveBeenCalledWith(false);
        expect(mockSetGameData).toHaveBeenCalledWith({ [selectedRoom]: [] });
        expect(mockSetIsWon).toHaveBeenCalledWith(false);
        expect(mockSetIsLost).toHaveBeenCalledWith(false);
        expect(mockSetDisabled).toHaveBeenCalledWith(false);
        expect(mockSetWaitingForSecondUser).toHaveBeenCalledWith(true);
        expect(socketEmit).toHaveBeenCalledWith(events.letsPlay);
    });
});
