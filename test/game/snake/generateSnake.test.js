/* eslint-env jest */
const { generateSnake } = require('../../../lib/game/snake');

describe('generateSnake', () => {
  it('generates the correct snake coordinates', () => {
    const snake = generateSnake(20, 20);

    expect(snake.length).toBe(4);
    expect(snake).toMatchSnapshot();
  });
});
