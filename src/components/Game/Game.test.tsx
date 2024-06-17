import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';
import { useUserInfo } from '../../contexts/UserContext';
import useHandleOnReadyEvent from '../../hooks/useHandleOnReadyEvent';

jest.mock('../../contexts/UserContext');
jest.mock('../../hooks/useHandleOnReadyEvent');
jest.mock('../Header/Header', () => () => (
  <div data-testid="header">Header</div>
));
jest.mock('../Footer/Footer', () => () => (
  <div data-testid="footer">Footer</div>
));
jest.mock('../SideBar/SideBar', () => () => (
  <div data-testid="sidebar">Sidebar</div>
));
jest.mock('../MainContent/MainContent', () => () => (
  <div data-testid="main-content-section">MainContent</div>
));

const mockUseUserInfo = useUserInfo as jest.Mock;

describe('Game component', () => {
  beforeEach(() => {
    mockUseUserInfo.mockReturnValue({
      setSelectedRoom: jest.fn(),
    });
    (useHandleOnReadyEvent as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all child components i.e header , sidebar , mainContent, footer', () => {
    render(<Game />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
