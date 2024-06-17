import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { useUserInfo } from '../../contexts/UserContext';

jest.mock('../../contexts/UserContext');

const mockUseUserInfo = useUserInfo as jest.Mock;

describe('<Header/>', () => {
  beforeEach(() => {
    mockUseUserInfo.mockReturnValue({
      selectedRoom: 'RoomAmsterdam',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render <Header/> component correctly', () => {
    render(<Header />);

    const logo = screen.getByAltText('Header Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'header-logo.png');

    expect(screen.getByText('Playing with Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Win the game or win the job')).toBeInTheDocument();
  });

  it('should render correct room name based on context', () => {
    mockUseUserInfo.mockReturnValueOnce({
      selectedRoom: 'RoomBerlin',
    });

    render(<Header />);
    expect(screen.getByText('Playing with Berlin')).toBeInTheDocument();
  });
});
