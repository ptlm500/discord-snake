const constants = require('./constants');

function generateWorld(width, height) {
  const world = [];

  // Initialize with spaces
  for (let row = 0; row < height; row++) {
    world[row] = [];
    for(let col = 0; col < width; col++) {
      world[row][col] = constants.SPACE;
    }
  }

  // Set corners
  world[0][0] = constants.CORNER;
  world[height - 1][0] = constants.CORNER;
  world[0][width - 1] = constants.CORNER;
  world[height - 1][width - 1] = constants.CORNER;

  // Set vertical walls
  for (let row = 1; row < height - 1; row++) {
    world[row][0] = world[row][width - 1] = constants.V_WALL;
  }

  for (let col = 1; col < width - 1; col++) {
    world[0][col] = world[height - 1][col] = constants.H_WALL;
  }

  return world;
}

module.exports = class World {
  constructor({width, height}) {
    this.width = width;
    this.height = height;

    this.world = generateWorld(width, height);
  }

  toString() {
    let s = '';

    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        s += this.world[row][col];
      }

      s += '\n';
    }

    return s;
  }
};
