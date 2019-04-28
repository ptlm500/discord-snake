/* eslint-env jest */
const { didHitSelf } = require('../../../lib/game/utils');

describe('didHitSelf', () => {
  it('returns false if for a snake length 4', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0}
      ]
    };

    expect(didHitSelf(snake)).toBeFalsy();
  });

  it('returns false if none of the snake coordinates overlap', () => {
    const snake = {
      length: 4,
      parts: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0}
      ]
    };

    expect(didHitSelf(snake)).toBeFalsy();
  });

  it('returns true if snake coordinates overlap', () => {
    const snake = {
      length: 5,
      parts: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 0, y: 0}
      ]
    };

    expect(didHitSelf(snake)).toBeTruthy();
  });
});
