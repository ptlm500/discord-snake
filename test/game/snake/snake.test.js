/* eslint-env jest */
const { Snake } = require('../../../lib/game/snake');

const parts = [
  {x: 12, y: 10},
  {x: 11, y: 10},
  {x: 10, y: 10},
  {x: 9, y: 10}
];

describe('Snake', () => {
  it('constructs a Snake correctly from the parts array', () => {
    const snake = new Snake(parts);

    expect(snake.length).toBe(4);
    expect(snake.parts).toEqual(parts);
    expect(snake.horizontalVelocity).toBe(1);
    expect(snake.verticalVelocity).toBe(0);
  });

  test('headIsAt returns the correct values', () => {
    const snake = new Snake(parts);

    expect(snake.headIsAt(12, 10)).toBeTruthy();
    expect(snake.headIsAt(9, 10)).toBeFalsy();
    expect(snake.headIsAt(1, 1)).toBeFalsy();
  });

  test('isAt returns the correct values', () => {
    const snake = new Snake(parts);

    expect(snake.isAt(12, 10)).toBeTruthy();
    expect(snake.isAt(9, 10)).toBeTruthy();
    expect(snake.isAt(1, 1)).toBeFalsy();
  });

  it('advances in response to positive horizontalVelocity', () => {
    const snake = new Snake([
      {x: 12, y: 10},
      {x: 11, y: 10},
      {x: 10, y: 10},
      {x: 9, y: 10}
    ]);

    snake.advance(1, 0, false);

    expect(snake.horizontalVelocity).toBe(1);
    expect(snake.verticalVelocity).toBe(0);
    expect(snake.length).toBe(4);
    expect(snake.parts).toMatchSnapshot();
  });

  it('advances in response to negative horizontalVelocity', () => {
    const snake = new Snake([
      {x: 12, y: 9},
      {x: 11, y: 10},
      {x: 10, y: 10},
      {x: 9, y: 10}
    ]);

    snake.advance(-1, 0, false);

    expect(snake.horizontalVelocity).toBe(-1);
    expect(snake.verticalVelocity).toBe(0);
    expect(snake.length).toBe(4);
    expect(snake.parts).toMatchSnapshot();
  });

  it('advances in response to positive verticalVelocity', () => {
    const snake = new Snake([
      {x: 12, y: 10},
      {x: 11, y: 10},
      {x: 10, y: 10},
      {x: 9, y: 10}
    ]);

    snake.advance(0, 1, false);

    expect(snake.horizontalVelocity).toBe(0);
    expect(snake.verticalVelocity).toBe(1);
    expect(snake.length).toBe(4);
    expect(snake.parts).toMatchSnapshot();
  });

  it('advances in response to negative verticalVelocity', () => {
    const snake = new Snake([
      {x: 12, y: 10},
      {x: 11, y: 10},
      {x: 10, y: 10},
      {x: 9, y: 10}
    ]);

    snake.advance(0, -1, false);

    expect(snake.horizontalVelocity).toBe(0);
    expect(snake.verticalVelocity).toBe(-1);
    expect(snake.length).toBe(4);
    expect(snake.parts).toMatchSnapshot();
  });

  it('advances and grows when didEatFoodIsTrue', () => {
    const snake = new Snake([
      {x: 12, y: 10},
      {x: 11, y: 10},
      {x: 10, y: 10},
      {x: 9, y: 10}
    ]);

    snake.advance(1, 0, true);

    expect(snake.horizontalVelocity).toBe(1);
    expect(snake.verticalVelocity).toBe(0);
    expect(snake.length).toBe(5);
    expect(snake.parts).toMatchSnapshot();
  });
});
