const didHitSelf = require('./didHitSelf');

module.exports = function didGameEnd(snake, world) {
  console.log(snake, snake.length, snake.parts);
  if (didHitSelf(snake)) {
    return true;
  } else if (snake.parts[0].x <= 0) {
    return true;
  } else if (snake.parts[0].x >= world.width - 1) {
    return true;
  } else if (snake.parts[0].y <= 0) {
    return true;
  } else if (snake.parts[0].y >= world.height - 1) {
    return true;
  }
};
