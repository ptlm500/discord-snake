module.exports = function didHitSelf(snake) {
  // The head can only touch snake body parts after i = 4
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
};
