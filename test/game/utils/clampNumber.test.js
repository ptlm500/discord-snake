/* eslint-env jest */
const { clampNumber } = require('../../../lib/game/utils');

describe('clampNumber', () => {
  it('returns the number if no bounds are set', () => {
    expect(clampNumber(10)).toBe(10);
  });

  it('returns the number if it is within the bounds', () => {
    expect(clampNumber(10, 0, 100)).toBe(10);
  });

  it('returns the lower bound if the number is below the lower bound', () => {
    expect(clampNumber(-10, 0, 100)).toBe(0);
  });

  it('returns the upper bound if the number is below the lower bound', () => {
    expect(clampNumber(101, 0, 100)).toBe(100);
  });
});
