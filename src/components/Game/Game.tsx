import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/SideBar';
import MainContent from '../MainContent/MainContent';
import useHandleOnReadyEvent from '../../hooks/useHandleOnReadyEvent';
import './Game.css';
import { useUserInfo } from '../../contexts/UserContext';

const Game = () => {
  const { setSelectedRoom } = useUserInfo();
  useHandleOnReadyEvent();

  return (
    <div className="app" data-testid="game-container">
      <Header data-testid="header" />
      <div className="main-content" data-testid="main-content">
        <Sidebar data-testid="sidebar" />
        <MainContent data-testid="main-content-container" />
      </div>
      <Footer data-testid="footer" />
    </div>
  );
};

export default Game;
