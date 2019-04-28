/* eslint-env jest */
const { getVelocityForMove } = require('../../../lib/game/utils');

describe('getVelocityForMove', () => {
  it('returns the velocities when there is no requested move', () => {
    const snake = {
      horizontalVelocity: 0,
      verticalVelocity: -1
    };

    expect(getVelocityForMove('', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: -1
    });
  });

  it('sets the correct velocities when the snake is moving left', () => {
    const snake = {
      horizontalVelocity: -1,
      verticalVelocity: 0
    };

    expect(getVelocityForMove('left', snake)).toEqual({
      horizontalVelocity: -1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('right', snake)).toEqual({
      horizontalVelocity: -1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('up', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: -1
    });
    expect(getVelocityForMove('down', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: 1
    });
  });

  it('sets the correct velocities when the snake is moving right', () => {
    const snake = {
      horizontalVelocity: 1,
      verticalVelocity: 0
    };

    expect(getVelocityForMove('left', snake)).toEqual({
      horizontalVelocity: 1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('right', snake)).toEqual({
      horizontalVelocity: 1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('up', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: -1
    });
    expect(getVelocityForMove('down', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: 1
    });
  });

  it('sets the correct velocities when the snake is moving up', () => {
    const snake = {
      horizontalVelocity: 0,
      verticalVelocity: -1
    };

    expect(getVelocityForMove('left', snake)).toEqual({
      horizontalVelocity: -1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('right', snake)).toEqual({
      horizontalVelocity: 1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('up', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: -1
    });
    expect(getVelocityForMove('down', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: -1
    });
  });

  it('sets the correct velocities when the snake is moving down', () => {
    const snake = {
      horizontalVelocity: 0,
      verticalVelocity: 1
    };

    expect(getVelocityForMove('left', snake)).toEqual({
      horizontalVelocity: -1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('right', snake)).toEqual({
      horizontalVelocity: 1,
      verticalVelocity: 0
    });
    expect(getVelocityForMove('up', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: 1
    });
    expect(getVelocityForMove('down', snake)).toEqual({
      horizontalVelocity: 0,
      verticalVelocity: 1
    });
  });
});
