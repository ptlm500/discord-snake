const constants = require('./constants');

function getNextDirection(inputDirection, currentDirection) {
  const {LEFT, RIGHT, UP, DOWN} = constants.directions;
  switch(inputDirection) {
  case LEFT:
    if (currentDirection === RIGHT) {
      return RIGHT;
    }
    return LEFT;
  case RIGHT:
    if (currentDirection === LEFT) {
      return LEFT;
    }
    return RIGHT;
  case UP:
    if (currentDirection === DOWN) {
      return DOWN;
    }
    return UP;
  case DOWN:
    if (currentDirection === UP) {
      return UP;
    }
    return DOWN;
  default:
    console.error(`[Snake.move] Invalid direction ${inputDirection}`);
    return null;
  }
}

module.exports = class Snake {
  constructor({position, startDirection}) {
    this.position = position;
    this.direction = startDirection;
  }

  // updateHeadPosition() {
  //   const positionModifier = constants.positionModifiers[this.direction];
  //   this.position.head = {
  //     x: this.position.head.x + positionModifier.x,
  //     y: this.position.head.y + positionModifier.y
  //   };
  // }

  move(inputDirection) {
    const nextDirection = getNextDirection(inputDirection, this.direction);

    if (nextDirection && this.direction !== nextDirection) {
      const {x, y} = this.snakeState.head;
      this.directionWaypoints[`${x}_${y}`] = nextDirection;
    }
  }
};

// this = {
//   snakeState: {
//     head: {
//       x,
//       y,
//       direction
//     },
//     body: [
//       {
//         x,
//         y,
//         direction
//       },
//     ]
//   },
//   directionWaypoints: {
//     "x_y": direction
//   }
// }
