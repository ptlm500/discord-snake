const {
  World
} = require('./world');
const {
  Snake,
  generateSnake,
  SNAKE_HEAD_CHAR,
  SNAKE_BODY_CHAR
} = require('./snake');
const {
  FOOD_CHAR,
  FOOD_SCORE_VALUE,
  generateFood
} = require('./food');
const {
  didGameEnd,
  getVelocityForMove
} = require('./utils');
const logger = require('../logger');

const MIN_WIDTH = 15;
const MIN_HEIGHT = 15;

function validSize(width, height) {
  return width >= MIN_WIDTH && height >= MIN_HEIGHT;
}

module.exports = class Game {
  constructor(width, height) {
    if (width && height) {
      if (validSize(width, height)) {
        this.world = new World(width, height);
        this.snake = new Snake(generateSnake(width, height));
        this.food = generateFood(width, height, this.snake);
        this.score = 0;
        this.message = '';
        this.gameOver = false;
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
      logger.info({message: 'Game ended'});
      this.message = this.renderGameOver();
      this.gameOver = true;

      return;
    }

    const snakeAteFood = this.snake.isAt(this.food.x, this.food.y);

    const {
      horizontalVelocity,
      verticalVelocity
    } = getVelocityForMove(requestedMove, this.snake);

    this.snake.advance(horizontalVelocity, verticalVelocity, snakeAteFood);

    if (snakeAteFood) {
      this.food = generateFood(this.world.width, this.world.height, this.snake);
      this.score = this.score += FOOD_SCORE_VALUE;
    }

    this.message = this.render();
  }

  start() {
    this.message = this.render();
  }

  render() {
    let s = '\n```\n';
    for (let row = 0; row < this.world.height; row++) {
      for (let col = 0; col < this.world.width; col++) {
        const snakeIsAt = this.snake.isAt(col, row);
        if (this.snake.headIsAt(col, row)) {
          s += SNAKE_HEAD_CHAR;
        } else if (snakeIsAt) {
          s += SNAKE_BODY_CHAR;
        } else if (this.food.x === col && this.food.y === row) {
          s += FOOD_CHAR;
        } else {
          s += this.world.getCharAt(row, col);
        }
      }

      s += '\n';
    }

    s += `Score: ${this.score}\n`;

    s += '```';

    return s;
  }

  renderGameOver() {
    const s = `
      Game Over!
      Score: ${this.score}
    `;

    return s;
  }
};
