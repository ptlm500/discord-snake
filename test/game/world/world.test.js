/* eslint-env jest */
const { World } = require('../../../lib/game/world');

describe('World', () => {
  it('generates a world of the correct size', () => {
    const width = 10;
    const height = 10;

    const world = new World(width, height);

    expect(world.height).toBe(height);
    expect(world.width).toBe(width);
  });

  it('renders the world to a string when toString is called', () => {
    const world = new World(10, 10);

    expect(world.toString()).toMatchSnapshot();
  });

  it('returns a char when getCharAt is called', () => {
    const world = new World(10, 10);

    expect(world.getCharAt(0, 0)).toBe('🔲');
  });
});
