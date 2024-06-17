import React, { useState } from 'react';
import { Input, Space, Button } from 'antd';

import { useSocketClient } from '../../contexts/SocketClientContext';
import { useUserInfo } from '../../contexts/UserContext';
import { events } from '../constants';
import useSuccessNotification from '../../hooks/useSuccessNotification';

const Login: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const { setUsername } = useUserInfo();
  const socket = useSocketClient();
  const { openNotificationWithIcon, contextHolder } = useSuccessNotification(
    'Login Successful',
    'Please join a room'
  );
  const handleLoginUser = () => {
    openNotificationWithIcon();
    // Added timeout so that notification can be disappeared before the component is unmounted
    setTimeout(() => setUsername(user), 1000);
    socket.emit(events.login, { username: user });
  };

  return (
    <Space>
      {contextHolder}
      <Input onChange={(event) => setUser(event.target.value)} />
      <Button
        type="primary"
        onClick={handleLoginUser}
        disabled={!user}
      >
        Login
      </Button>
    </Space>
  );
};

export default Login;
