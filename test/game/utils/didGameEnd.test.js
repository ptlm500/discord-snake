/* eslint-env jest */
const { didGameEnd } = require('../../../lib/game/utils');

describe('didGameEnd', () => {
  it('returns false when the snake isn\'t touching itself or any walls', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeFalsy();
  });

  it('returns true when the snake is touching the top wall', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 1, y: 0},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeTruthy();
  });

  it('returns true when the snake is touching the bottom wall', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 1, y: 9},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeTruthy();
  });

  it('returns true when the snake is touching the left wall', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 0, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeTruthy();
  });

  it('returns true when the snake is touching the right wall', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 9, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeTruthy();
  });

  it('returns true when the snake coordinates overlap', () => {
    const snake = {
      length: 5,
      parts: [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1},
        {x: 1, y: 1}
      ]
    };

    const world = {
      width: 10,
      height: 10
    };

    expect(didGameEnd(snake, world)).toBeTruthy();
  });
});
