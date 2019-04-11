const World = require('./world/World');
const Snake = require('./snake/Snake');
const didGameEnd = require('./utils/didGameEnd');

const MIN_WIDTH = 20;
const MIN_HEIGHT = 20;

function validSize(width, height) {
  return width >= MIN_WIDTH && height >= MIN_HEIGHT;
}

function generateSnake(width, height) {
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);

  const snake = [];

  for (let i = 2; i > -2; i--) {
    snake.push({x: halfWidth + i, y: halfHeight});
  }

  return snake;
}

module.exports = class Game {
  constructor(width, height) {
    if (width && height) {
      if (validSize(width, height)) {
        this.world = new World(width, height);
        this.snake = new Snake(generateSnake(width, height));
      }
    }
  }

  load(saveState) {
    const {world, snake} = saveState;

    if (world && snake) {
      this.world = world;
      this.snake = snake;
    }
  }

  tick(horizontalVelocity, verticalVelocity) {
    if (didGameEnd(this.snake, this.world)) {
      return false;
    }

    this.snake.advance(horizontalVelocity, verticalVelocity, () => false);

    return this.render();
  }

  render() {
    let s = '\n```\n';

    // console.log(this.snake.parts);

    for (let row = 0; row < this.world.height; row++) {
      for (let col = 0; col < this.world.width; col++) {
        const snakeIsAt = this.snake.isAt(col, row);
        if (snakeIsAt) {
          s += 'o';
        } else {
          s += this.world.getCharAt(row, col);
        }
      }

      s += '\n';
    }

    s += '```';

    return s;
  }
};
