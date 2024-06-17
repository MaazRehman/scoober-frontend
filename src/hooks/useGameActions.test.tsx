import { renderHook, act } from '@testing-library/react';
import { useUserInfo } from '../contexts/UserContext';
import { useGameData } from '../contexts/GameDataContext';
import { useGameStatus } from '../contexts/GameStatusContext';
import { useSocketClient } from '../contexts/SocketClientContext';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import { events, gameState } from '../components/constants';
import useGameActions from './useGameActions';
import { calculateRecord } from '../components/utils';

jest.mock('../contexts/UserContext');
jest.mock('../contexts/GameDataContext');
jest.mock('../contexts/GameStatusContext');
jest.mock('../contexts/SocketClientContext');
jest.mock('../contexts/PresentationLogicContext');
jest.mock('../components/utils');

const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
};

describe('useGameActions', () => {
  let mockSetWaitingForSecondUser: jest.Mock;
  let mockSetWaitingForSecondUserToRespond: jest.Mock;
  let mockSetDisabled: jest.Mock;
  let mockSetIsWon: jest.Mock;
  let mockSetIsLost: jest.Mock;
  let mockSetGameData: jest.Mock;
  let mockSetSocketId: jest.Mock;

  beforeEach(() => {
    (useSocketClient as jest.Mock).mockReturnValue(mockSocket);

    mockSetWaitingForSecondUser = jest.fn();
    mockSetWaitingForSecondUserToRespond = jest.fn();
    mockSetDisabled = jest.fn();
    mockSetIsWon = jest.fn();
    mockSetIsLost = jest.fn();
    mockSetGameData = jest.fn();
    mockSetSocketId = jest.fn();

    (useUserInfo as jest.Mock).mockReturnValue({
      username: 'maaz',
      socketId: 'anyRandomSocketId',
      setSocketId: mockSetSocketId,
    });

    (useGameData as jest.Mock).mockReturnValue({
      gameData: {
        'Room 1': [],
      },
      setGameData: mockSetGameData,
    });

    (useGameStatus as jest.Mock).mockReturnValue({
      setIsWon: mockSetIsWon,
      setIsLost: mockSetIsLost,
    });

    (usePresentationLogic as jest.Mock).mockReturnValue({
      setDisabled: mockSetDisabled,
      setWaitingForSecondUser: mockSetWaitingForSecondUser,
      setWaitingForSecondUserToRespond: mockSetWaitingForSecondUserToRespond,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle random number event correctly', () => {
    const { result } = renderHook(() =>
      useGameActions({ selectedRoom: 'Room 1' })
    );

    const data = {
      number: 5,
      selectedNumber: 3,
      user: 'otherUser',
      isFirst: true,
      isCorrectResult: false,
    };

    act(() => {
      mockSocket.on.mock.calls[0][1](data);
    });

    expect(result.current.number).toBe(5);
    expect(mockSetWaitingForSecondUser).toHaveBeenCalledWith(false);
  });

  it('should handle activate your turn event correctly', () => {
    const { result } = renderHook(() =>
      useGameActions({ selectedRoom: 'Room 1' })
    );

    const data = {
      user: 'anyRandomSocketId',
      state: gameState.play,
    };

    act(() => {
      mockSocket.on.mock.calls[1][1](data);
    });

    expect(mockSetWaitingForSecondUserToRespond).toHaveBeenCalledWith(false);
    expect(mockSetDisabled).toHaveBeenCalledWith(false);
  });

  it('should handle game over event correctly', () => {
    const { result } = renderHook(() =>
      useGameActions({ selectedRoom: 'Room 1' })
    );

    const data = {
      user: 'maaz',
      isOver: true,
    };

    act(() => {
      mockSocket.on.mock.calls[2][1](data);
    });

    expect(mockSetDisabled).toHaveBeenCalledWith(true);
    expect(mockSetWaitingForSecondUserToRespond).toHaveBeenCalledWith(false);
    expect(mockSetIsWon).toHaveBeenCalledWith(true);
    expect(result.current.number).toBe(0);
  });
});
