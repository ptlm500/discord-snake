module.exports = function didHitSelf(snake) {
  // The head can only touch snake body parts after i = 4
  if (snake) {
    for (let i = 4; i < snake.length; i++) {
      if (snake.parts[i].x === snake.parts[0].x && snake.parts[i].y === snake.parts[0].y) {
        return true;
      }
    }
  }

  return false;
};
