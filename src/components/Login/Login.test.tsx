import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { useUserInfo } from '../../contexts/UserContext';
import { useSocketClient } from '../../contexts/SocketClientContext';
import { events } from '../constants';

jest.mock('../../contexts/UserContext');
jest.mock('../../contexts/SocketClientContext');

const mockSetUsername = jest.fn();
const mockUseUserInfo = useUserInfo as jest.Mock;
const mockUseSocketClient = useSocketClient as jest.Mock;

describe('Login component', () => {
  beforeEach(() => {
    mockUseUserInfo.mockReturnValue({
      setUsername: mockSetUsername,
    });
    mockUseSocketClient.mockReturnValue({
      emit: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update input field and enable login button', () => {
    render(<Login />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'TestUser' } });
    expect(input).toHaveValue('TestUser');

    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeEnabled();
  });

  it('should call socket.emit when login button is clicked', async () => {
    render(<Login />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'TestUser' } });

    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    expect(mockUseSocketClient().emit).toHaveBeenCalledWith(events.login, {
      username: 'TestUser',
    });
  });
});
