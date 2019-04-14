const World = require('./world/World');
const Snake = require('./snake/Snake');
const didGameEnd = require('./utils/didGameEnd');
const getVelocityForMove = require('./utils/getVelocityForMove');

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

function generateRandomCoordinate(max) {
  return Math.floor(Math.random() * max - 2) + 1;
}

function generateFood(width, height, snake) {
  const foodX = generateRandomCoordinate(width);
  const foodY = generateRandomCoordinate(height);

  if (snake.isAt(foodX, foodY)) {
    generateFood(width, height, snake);
    return;
  }
  return {
    x: foodX,
    y: foodY
  };
}

module.exports = class Game {
  constructor(width, height) {
    if (width && height) {
      if (validSize(width, height)) {
        this.world = new World(width, height);
        this.snake = new Snake(generateSnake(width, height));
        this.food = generateFood(width, height, this.snake);
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

  tick(requestedMove) {
    if (didGameEnd(this.snake, this.world)) {
      return false;
    }

    const snakeAteFood = this.snake.isAt(this.food.x, this.food.y);

    const {
      horizontalVelocity,
      verticalVelocity
    } = getVelocityForMove(requestedMove, this.snake);

    this.snake.advance(horizontalVelocity, verticalVelocity, snakeAteFood);

    if (snakeAteFood) {
      this.food = generateFood(this.world.width, this.world.height, this.snake);
    }

    return this.render();
  }


  render() {
    let s = '\n```\n';
    for (let row = 0; row < this.world.height; row++) {
      for (let col = 0; col < this.world.width; col++) {
        const snakeIsAt = this.snake.isAt(col, row);
        if (snakeIsAt) {
          s += '🔶';
        } else if (this.food.x === col && this.food.y === row) {
          s += '🔴';
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
