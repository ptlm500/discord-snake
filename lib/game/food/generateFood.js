const {generateRandomCoordinate} = require('../utils');

module.exports = function generateFood(width, height, snake) {
  const foodX = generateRandomCoordinate(1, width);
  const foodY = generateRandomCoordinate(1, height);

  if (snake.isAt(foodX, foodY)) {
    return generateFood(width, height, snake);
  }

  return {
    x: foodX,
    y: foodY
  };
};
