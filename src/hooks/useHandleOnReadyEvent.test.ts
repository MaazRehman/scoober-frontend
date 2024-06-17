import { renderHook } from '@testing-library/react';
import useHandleOnReadyEvent from './useHandleOnReadyEvent';
import { useSocketClient } from '../contexts/SocketClientContext';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import { events } from '../components/constants';

jest.mock('../contexts/SocketClientContext');
jest.mock('../contexts/PresentationLogicContext');

const mockedUseSocketClient = useSocketClient as jest.Mock;
const mockedUsePresentationLogic = usePresentationLogic as jest.Mock;

describe('useHandleOnReadyEvent', () => {
  let mockSocket: { on: jest.Mock; emit: jest.Mock; off: jest.Mock };
  let setWaitingForSecondUserToRespond: jest.Mock;

  beforeEach(() => {
    setWaitingForSecondUserToRespond = jest.fn();
    mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      off: jest.fn(),
    };

    mockedUseSocketClient.mockReturnValue(mockSocket);
    mockedUsePresentationLogic.mockReturnValue({
      setWaitingForSecondUserToRespond,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should emit letsPlay on onReady', () => {
    renderHook(() => useHandleOnReadyEvent());

    const handleOnReady = mockSocket.on.mock.calls[0][1];

    handleOnReady();

    expect(setWaitingForSecondUserToRespond).toHaveBeenCalledWith(false);
    expect(mockSocket.emit).toHaveBeenCalledWith(events.letsPlay);
  });
});
