import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainContent from './MainContent';
import GameStep from '../GameStep/GameStep';
import GameActions from '../GameActions/GameActions';
import DecisionFrame from '../DecisionFrame/DecisionFrame';
import Loader from '../Loader/Loader';
import { useGameData } from '../../contexts/GameDataContext';
import { useGameStatus } from '../../contexts/GameStatusContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { useUserInfo } from '../../contexts/UserContext';

jest.mock('../GameStep/GameStep');
jest.mock('../GameActions/GameActions');
jest.mock('../DecisionFrame/DecisionFrame');
jest.mock('../Loader/Loader');
jest.mock('../../contexts/GameDataContext');
jest.mock('../../contexts/GameStatusContext');
jest.mock('../../contexts/PresentationLogicContext');
jest.mock('../../contexts/UserContext');

describe('<MainContent />', () => {
    const mockUseGameData = useGameData as jest.MockedFunction<typeof useGameData>;
    const mockUseGameStatus = useGameStatus as jest.MockedFunction<typeof useGameStatus>;
    const mockUsePresentationLogic = usePresentationLogic as jest.MockedFunction<typeof usePresentationLogic>;
    const mockUseUserInfo = useUserInfo as jest.MockedFunction<typeof useUserInfo>;

    beforeEach(() => {
        mockUseGameData.mockReturnValue({
            gameData: {
                'Room Berlin CPU': [
                    { step: 1, equation: '2 + 2', result: 4, username: 'Player1' },
                    { step: 2, equation: '5 - 3', result: 2, username: 'Player2' },
                ],
            },
            setGameData: ()=> {}
        });

        // @ts-ignore Adding ts ignore since there is no point in mocking all return value from hook
        mockUseGameStatus.mockReturnValue({ isWon: false, isLost: false });
        // @ts-ignore Adding ts ignore since there is no point in mocking all return value from hook
        mockUsePresentationLogic.mockReturnValue({ waitingForSecondUser: false, waitingForSecondUserToRespond: false });
        // @ts-ignore Adding ts ignore since there is no point in mocking all return value from hook
        mockUseUserInfo.mockReturnValue({ username: 'TestUser', selectedRoom: 'Room Berlin CPU' });

        (GameStep as jest.Mock).mockImplementation(({ step, equation, result, username }) => (
            <div data-testid={`game-step-${step}`}>
                <span>{step}</span>
                <span>{equation}</span>
                <span>{result}</span>
                <span>{username}</span>
            </div>
        ));

        (GameActions as jest.Mock).mockImplementation(() => <div data-testid="mock-game-actions">Game Actions</div>);
        (DecisionFrame as jest.Mock).mockImplementation(() => <div data-testid="mock-decision-frame">Decision Frame</div>);
        (Loader as jest.Mock).mockImplementation(({ tip }: { tip: string }) => (
            <div data-testid={`mock-loader-${tip}`}>{tip}</div>
        ));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders MainContent component with all child components', () => {
        render(<MainContent />);

        const mainContent = screen.getByTestId('main-content');
        expect(mainContent).toBeInTheDocument();

        const gameSteps = screen.getAllByTestId(/^game-step-\d+$/);
        expect(gameSteps).toHaveLength(2);

        const dividers = screen.getAllByTestId(/^divider-\d+$/);
        expect(dividers).toHaveLength(2);

        expect(screen.queryByTestId('mock-loader-waiting for second user to play their turn')).toBeNull();
        expect(screen.queryByTestId('mock-loader-Waiting for the second user to join')).toBeNull();

        expect(screen.getByTestId('mock-game-actions')).toBeInTheDocument();
    });

});
