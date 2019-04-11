const constants = require('../constants');

module.exports = function getVelocityForMove(requestedMove, snake) {
  const velocity = {
    horizontalVelocity: snake.horizontalVelocity,
    verticalVelocity: snake.verticalVelocity
  };

  if (requestedMove === constants.LEFT && velocity.horizontalVelocity !== 1) {
    velocity.horizontalVelocity = -1;
    velocity.verticalVelocity = 0;
  } else if (requestedMove === constants.RIGHT && velocity.horizontalVelocity !== -1) {
    velocity.horizontalVelocity = 1;
    velocity.verticalVelocity = 0;
  } else if (requestedMove === constants.UP && velocity.verticalVelocity !== 1) {
    velocity.verticalVelocity = -1;
    velocity.horizontalVelocity = 0;
  } else if (requestedMove === constants.DOWN && velocity.verticalVelocity !== -1) {
    velocity.verticalVelocity = 1;
    velocity.horizontalVelocity = 0;
  }

  return velocity;
};
