export const rooms = [
  { name: 'Room Berlin CPU', type: 'cpu' },
  { name: 'Room Izmir CPU', type: 'cpu' },
  { name: 'Room Amsterdam', type: 'human' },
];

export const defaultRoom = 'Room Amsterdam';

export const events = {
  letsPlay: 'letsPlay',
  onReady: 'onReady',
  randomNumber: 'randomNumber',
  activateYourTurn: 'activateYourTurn',
  gameOver: 'gameOver',
  sendNumber: 'sendNumber',
  joinRoom: 'joinRoom',
  leaveRoom: 'leaveRoom',
  login: 'login',
};

export const buttonValues = [-1, 0, 1];

export const leftStyle = { float: 'left' };
export const rightStyle = { float: 'right' };

export const gameState = {
  play: 'play',
  wait: 'wait',
};
