import React, { useState } from 'react';
import Login from '../Login/Login';
import useHandleMessage from '../../hooks/useHandleMessage';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { useUserInfo } from '../../contexts/UserContext';
import { usePresentationLogic } from '../../contexts/PresentationLogicContext';

import { events } from '../constants';
import useSuccessNotification from '../../hooks/useSuccessNotification';
import useGetRoomsInfo from '../../hooks/useGetRoomsInfo';
import Loader from '../Loader/Loader';

const Sidebar: React.FC = () => {
  const { username, setSelectedRoom, selectedRoom } = useUserInfo();
  const socket = useSocketClient();
  const { setWaitingForSecondUser, loading } = usePresentationLogic();
  const [activeRoom, setActiveRoom] = useState<string>('');
  useHandleMessage();
  const { openNotificationWithIcon, contextHolder } = useSuccessNotification(
    'Room Joined Successfully',
    'Game will begin shortly'
  );
  const { data: rooms } = useGetRoomsInfo();

  const handleJoinRoom = (roomName: string, roomType: string) => {
    if (selectedRoom) {
      socket.emit(events.leaveRoom);
    }
    openNotificationWithIcon();
    setSelectedRoom(roomName);
    setActiveRoom(roomName);
    socket.emit(events.joinRoom, { username, room: roomName, roomType });
    setWaitingForSecondUser(true);
  };

  if (loading) {
    return <Loader tip="Loading rooms ... " />;
  }

  return (
    <aside className="sidebar">
      {contextHolder}
      {username ? (
        <>
          <h4>Choose your game room</h4>
          <ul>
            {rooms.map((room) => (
              <li
                key={room.name}
                onClick={() => handleJoinRoom(room.name, room.type)}
                className={activeRoom === room.name ? 'active' : ''}
              >
                <span> {room.name?.replace('Room', '')}</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Login />
      )}
    </aside>
  );
};

export default Sidebar;
