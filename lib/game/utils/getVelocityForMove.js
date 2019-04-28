const constants = require('../constants');
const VELOCITY_PER_TICK = 1;

module.exports = function getVelocityForMove(requestedMove, snake) {
  const velocity = {
    horizontalVelocity: snake.horizontalVelocity,
    verticalVelocity: snake.verticalVelocity
  };

  if (requestedMove === constants.LEFT && velocity.horizontalVelocity !== VELOCITY_PER_TICK) {
    velocity.horizontalVelocity = -VELOCITY_PER_TICK;
    velocity.verticalVelocity = 0;
  } else if (requestedMove === constants.RIGHT && velocity.horizontalVelocity !== -VELOCITY_PER_TICK) {
    velocity.horizontalVelocity = VELOCITY_PER_TICK;
    velocity.verticalVelocity = 0;
  } else if (requestedMove === constants.UP && velocity.verticalVelocity !== VELOCITY_PER_TICK) {
    velocity.verticalVelocity = -VELOCITY_PER_TICK;
    velocity.horizontalVelocity = 0;
  } else if (requestedMove === constants.DOWN && velocity.verticalVelocity !== -VELOCITY_PER_TICK) {
    velocity.verticalVelocity = VELOCITY_PER_TICK;
    velocity.horizontalVelocity = 0;
  }

  return velocity;
};
