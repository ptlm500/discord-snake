const constants = require('./constants');

module.exports = {
  Snake: require('./Snake'),
  generateSnake: require('./generateSnake'),
  SNAKE_HEAD_CHAR: constants.HEAD_CHAR,
  SNAKE_BODY_CHAR: constants.BODY_CHAR
};
