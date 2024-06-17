import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameStep from './GameStep';
import { leftStyle, rightStyle } from '../constants';

describe('<GameStep/>', () => {
  const defaultProps = {
    step: 1,
    equation: '2 + 2',
    result: 4,
    username: 'Player1',
    index: 0,
  };

  it('should render <GameStep/> component correctly with leftStyle', () => {
    render(<GameStep {...defaultProps} />);

    const playerInfo = screen.getByText('Player1');
    expect(playerInfo).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2 + 2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    const gameStepDiv = screen.getByTestId('game-step');
    expect(gameStepDiv).toHaveStyle(leftStyle);
  });

  it('should render <GameStep/> component with rightStyle', () => {
    render(<GameStep {...defaultProps} index={1} />);

    const playerInfo = screen.getByText('Player1');
    expect(playerInfo).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2 + 2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    const gameStepDiv = screen.getByTestId('game-step');
    expect(gameStepDiv).toHaveStyle(rightStyle);
  });
});
