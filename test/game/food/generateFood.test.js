/* eslint-env jest */
const { generateFood } = require('../../../lib/game/food');
const { generateRandomCoordinate } = require('../../../lib/game/utils');

jest.mock('../../../lib/game/utils/generateRandomCoordinate', () => {
  return jest.fn(() => 1);
});

describe('generateFood', () => {
  it('generates a random coordinate for food that doesn\'t collide with the snake', () => {
    const snake = {
      isAt: jest.fn(() => false)
    };

    const food = generateFood(10, 10, snake);

    expect(snake.isAt).toBeCalledTimes(1);
    expect(generateRandomCoordinate).toBeCalledTimes(2);
    expect(food).toEqual({x: 1, y: 1});
  });

  it('re-calls generateFood if the random coordinates collide with the snake on first run', () => {
    let isAtCalled = false;
    const snake = {
      isAt: jest.fn(() => {
        const returnValue = !isAtCalled;
        isAtCalled = true;

        return returnValue;
      })
    };

    const food = generateFood(10, 10, snake);

    expect(snake.isAt).toBeCalledTimes(2);
    expect(generateRandomCoordinate).toBeCalledTimes(4);
    expect(food).toEqual({x: 1, y: 1});
  });
});

