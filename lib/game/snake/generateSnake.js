module.exports = function generateSnake(width, height) {
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);

  const snake = [];

  for (let i = 2; i > -2; i--) {
    snake.push({x: halfWidth + i, y: halfHeight});
  }

  return snake;
};
