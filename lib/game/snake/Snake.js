module.exports = class Snake {
  constructor(snake) {
    this.snake = snake;
  }

  advance(horizontalVelocity, verticalVelocity, didEatFood) {
    const {snake} = this;
    const head = {
      x: snake[0].x + horizontalVelocity,
      y: snake[0].y + verticalVelocity
    };

    this.snake.unshift(head);

    if (!didEatFood(snake)) {
      this.snake.pop();
    }
  }
};
