import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameActions from './GameActions';
import useGameActions from '../../hooks/useGameActions';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import { useGameStatus } from '../../contexts/GameStatusContext';
import { GameDataProvider } from '../../contexts/GameDataContext'; // Import GameDataProvider
import { useUserInfo } from '../../contexts/UserContext';
import { buttonValues, events } from '../constants';

jest.mock('../../hooks/useGameActions');
jest.mock('../../contexts/SocketClientContext');
jest.mock('../../contexts/PresentationLogicContext');
jest.mock('../../contexts/GameStatusContext');
jest.mock('../../contexts/UserContext');

const mockUseGameActions = useGameActions as jest.Mock;
const mockUseSocketClient = useSocketClient as jest.Mock;
const mockUsePresentationLogic = usePresentationLogic as jest.Mock;
const mockUseGameStatus = useGameStatus as jest.Mock;
const mockUseUserInfo = useUserInfo as jest.Mock;

describe('<GameActions />', () => {
  beforeEach(() => {
    mockUseGameActions.mockReturnValue({ number: 5 });
    mockUseSocketClient.mockReturnValue({ emit: jest.fn() });
    mockUsePresentationLogic.mockReturnValue({
      setWaitingForSecondUserToRespond: jest.fn(),
      disabled: false,
      setDisabled: jest.fn(),
    });
    mockUseGameStatus.mockReturnValue({ isWon: false, isLost: false });
    mockUseUserInfo.mockReturnValue({ username: 'TestUser', selectedRoom: 'Room Berlin CPU' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render number and enabled buttons based on buttonValues', () => {
    render(
      <GameDataProvider>
        <GameActions  />
      </GameDataProvider>
    );

    expect(screen.getByTestId('number-display')).toHaveTextContent('5');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(buttonValues.length);

    buttons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent(`${buttonValues[index]}`);
      expect(button).toHaveAttribute(
        'data-testid',
        `button-${buttonValues[index]}`
      );
    });
  });

  it('should call sendSelectedNumber event when button is clicked', () => {
    const { emit } = mockUseSocketClient();

    render(
      <GameDataProvider>
        <GameActions />
      </GameDataProvider>
    );

    const button = screen.getByTestId('button-0');
    fireEvent.click(button);

    expect(emit).toHaveBeenCalledWith(events.sendNumber, {
      number: 5,
      selectedNumber: 0,
    });
  });
});
