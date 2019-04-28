/* eslint-env jest */
const { generateRandomCoordinate } = require('../../../lib/game/utils');

describe('generateRandomCoordiante', () => {
  it('generates a coordinate between min and max - 2', () => {
    expect(generateRandomCoordinate(1, 10)).toBeGreaterThanOrEqual(1);
    expect(generateRandomCoordinate(1, 10)).toBeLessThanOrEqual(8);
  });

  it('clamps a coordinate to min', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    expect(generateRandomCoordinate(1, 10)).toBe(1);
  });

  it('clamps a coordinate to max - 2', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 1;
    global.Math = mockMath;

    expect(generateRandomCoordinate(1, 10)).toBe(8);
  });
});
