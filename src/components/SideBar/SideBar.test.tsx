import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from './SideBar';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { useUserInfo } from '../../contexts/UserContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';
import useSuccessNotification from '../../hooks/useSuccessNotification';
import useGetRoomsInfo from "../../hooks/useGetRoomsInfo";
import useHandleMessage from '../../hooks/useHandleMessage';

jest.mock('../../contexts/SocketClientContext');
jest.mock('../../contexts/UserContext');
jest.mock('../../contexts/PresentationLogicContext');
jest.mock('../../hooks/useSuccessNotification');
jest.mock('../../hooks/useGetRoomsInfo');
jest.mock('../../hooks/useHandleMessage');

const rooms = [
  { name: 'Room Berlin CPU', type: 'cpu' },
  { name: 'Room Izmir CPU', type: 'cpu' },
  { name: 'Room Amsterdam', type: 'human' },
];

describe('<Sidebar />', () => {
  beforeEach(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      username: 'TestUser',
      setSelectedRoom: jest.fn(),
      selectedRoom: 'Room Berlin CPU', // Mocking selected room initially
    });

    (usePresentationLogic as jest.Mock).mockReturnValue({
      setWaitingForSecondUser: jest.fn(),
    });

    (useSocketClient as jest.Mock).mockReturnValue({
      emit: jest.fn(),
    });

    (useSuccessNotification as jest.Mock).mockReturnValue({
      openNotificationWithIcon: jest.fn(),
      contextHolder: (
        <div data-testid="mock-context-holder">Mock Context Holder</div>
      ),
    });

    (useHandleMessage as jest.Mock).mockImplementation(() => {});
    (useGetRoomsInfo as jest.Mock).mockReturnValue({data: rooms})

  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Sidebar component with room list', () => {
    render(<Sidebar />);

    expect(screen.getByText('Choose your game room')).toBeInTheDocument();

    const roomList = screen.getByRole('list');
    expect(roomList).toBeInTheDocument();

    const roomItems = screen.getAllByRole('listitem');
    expect(roomItems).toHaveLength(rooms.length);
  });

  it('should call handleJoinRoom when room item is clicked', () => {
    render(<Sidebar />);

    const roomItem = screen.getByText('Amsterdam');
    fireEvent.click(roomItem);

    // One for leaveRoom, one for joinRoom
    expect(useSocketClient().emit).toHaveBeenCalledTimes(2);
    expect(useUserInfo().setSelectedRoom).toHaveBeenCalledWith(
      'Room Amsterdam'
    );
    expect(usePresentationLogic().setWaitingForSecondUser).toHaveBeenCalledWith(
      true
    );
  });

  it('renders Login component when username is not set', () => {
    (useUserInfo as jest.Mock).mockReturnValueOnce({
      username: '',
      setSelectedRoom: jest.fn(),
      selectedRoom: '',
    });

    render(<Sidebar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
