const directions = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down'
};

const positionModifiers = {
  'left': {
    x: -1,
    y: 0
  },
  'right': {
    x: 1,
    y: 0
  },
  up: {
    x: 0,
    y: -1
  },
  'down': {
    x: 0,
    y: 1
  }
};

module.exports = {
  HEAD: 'O',
  BODY: 'o',
  directions,
  positionModifiers
};
