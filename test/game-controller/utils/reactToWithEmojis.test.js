/* eslint-env jest */
const { reactToWithEmojis } = require('../../../lib/game-controller/utils');
const logger = require('../../../lib/logger');

jest.mock('../../../lib/logger', () => {
  return {
    error: jest.fn()
  };
});

const testEmojis = ['◀', '▶'];

describe('reactToWithEmojis', () => {
  it('adds each of the test emojis', async () => {
    const message = {react: jest.fn()};

    await reactToWithEmojis(message, testEmojis);

    expect(message.react).toHaveBeenCalledTimes(2);
    expect(message.react).toHaveBeenNthCalledWith(1, testEmojis[0]);
    expect(message.react).toHaveBeenNthCalledWith(2, testEmojis[1]);
  });

  it('calls logger.error if a reaction fails', async () => {
    const message = {react: jest.fn(() => {
      throw new Error('Test error');
    })};

    await reactToWithEmojis(message, testEmojis);

    expect(message.react).toHaveBeenCalledTimes(2);
    expect(logger.error).toHaveBeenCalledTimes(2);
    expect(logger.error).toHaveBeenNthCalledWith(1,
      'Failed to react with emoji', new Error('Test error'));
    expect(logger.error).toHaveBeenNthCalledWith(2,
      'Failed to react with emoji', new Error('Test error'));
  });
});
