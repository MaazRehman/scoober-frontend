import { renderHook} from "@testing-library/react";
import useHandleMessage from './useHandleMessage';
import { useUserInfo } from '../contexts/UserContext';
import { useSocketClient } from '../contexts/SocketClientContext';

jest.mock('../contexts/UserContext');
jest.mock('../contexts/SocketClientContext');

const mockedUseUserInfo = useUserInfo as jest.MockedFunction<typeof useUserInfo>;
const mockedUseSocketClient = useSocketClient as jest.MockedFunction<typeof useSocketClient>;

describe('useHandleMessage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set socketId when receiving a welcome message', () => {
        const setSocketIdMock = jest.fn();
        // @ts-ignore since there is no need to implement all members here
        mockedUseUserInfo.mockReturnValue({ setSocketId: setSocketIdMock });

        const mockSocket = {
            on: jest.fn(), // Mocking the on method of socket
            emit: jest.fn(),
            off: jest.fn(),
        };

        mockedUseSocketClient.mockReturnValue(mockSocket);

       renderHook(() => useHandleMessage());

        const mockData = {
            message: 'Welcome TestUser',
            user: 'TestUser',
            socketId: 'socket123',
        };

        const handleSocketMessage = mockSocket.on.mock.calls[0][1];
        handleSocketMessage(mockData);

        expect(setSocketIdMock).toHaveBeenCalledWith('socket123');
    });

});
