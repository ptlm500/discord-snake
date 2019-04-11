module.exports = class Snake {
  constructor(snake) {
    this._parts = snake;
  }

  advance(horizontalVelocity, verticalVelocity, didEatFood) {
    if (horizontalVelocity !== -this._horizontalVelocity) {
      this._horizontalVelocity = horizontalVelocity;
    }
    if (verticalVelocity !== -this._verticalVelocity) {
      this._verticalVelocity = verticalVelocity;
    }

    const head = {
      x: this._parts[0].x + this._horizontalVelocity,
      y: this._parts[0].y + this._verticalVelocity
    };

    this._parts.unshift(head);

    if (!didEatFood(this._parts)) {
      this._parts.pop();
    }
  }

  isAt(x, y) {
    for (let snakeIdx = 0; snakeIdx < this._parts.length; snakeIdx++) {
      if (this._parts[snakeIdx].x === x && this._parts[snakeIdx].y === y) {
        return {snakeIdx};
      }
    }

    return false;
  }

  get length() {
    return this._parts.length;
  }

  get parts() {
    return this._parts;
  }
};
