/* eslint-env jest */
const VotingHandler = require('../../../lib/game-controller/voting-handler');
const EventEmitter = require('events').EventEmitter;

const testConfig = {
  clientUserId: 'test-user-id',
  voteTimerInSecs: 10,
  controlEmojis: {'◀': 'left', '▶': 'right'}
};

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

describe('VotingHandler', () => {
  it('sets up a VotingHandler based on the provided config', () => {
    const votingHandler = new VotingHandler(testConfig);

    expect(votingHandler._clientUserId).toBe('test-user-id');
    expect(votingHandler._voteTimerInSecs).toBe(10);
    expect(votingHandler._votes).toEqual({
      'left': 0,
      'right': 0
    });
    expect(votingHandler._votingTimerStarted).toBeFalsy();
  });

  it('starts collecting votes when collectVotes is called', () => {
    const mockMessage = {createReactionCollector: jest.fn(() => new EventEmitter)};
    const mockCompletionAction = jest.fn();

    const votingHandler = new VotingHandler(testConfig);


    votingHandler.collectVotes(mockMessage, mockCompletionAction);

    expect(mockMessage.createReactionCollector).toBeCalledWith(votingHandler._collectorFilter);
  });

  it('collects a vote when the collect event is emitted and starts the timer', () => {
    const mockMessage = {createReactionCollector: jest.fn(() => new EventEmitter)};
    const mockCompletionAction = jest.fn();

    const votingHandler = new VotingHandler(testConfig);


    votingHandler.collectVotes(mockMessage, mockCompletionAction);

    votingHandler._collector.emit('collect', {emoji: {name: '◀'}, count: 2});

    expect(votingHandler._votes).toEqual({
      'left': 1,
      'right': 0
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);

    expect(setTimeout).toBeCalledWith(expect.any(Function), 10000);
  });

  it('when the timer ends it calls mockCompletionAction', () => {
    const mockMessage = {createReactionCollector: jest.fn(() => new EventEmitter)};
    const mockCompletionAction = jest.fn();

    const votingHandler = new VotingHandler(testConfig);


    votingHandler.collectVotes(mockMessage, mockCompletionAction);

    votingHandler._collector.emit('collect', {emoji: {name: '◀'}, count: 2});

    jest.advanceTimersByTime(10000);

    expect(mockCompletionAction).toBeCalledWith(mockMessage, 'left');
  });

  it('updates the votes when updateVotes is called with a valid vote', () => {
    const votingHandler = new VotingHandler(testConfig);

    votingHandler.updateVotes('left', 1);

    expect(votingHandler._votes).toEqual({
      'left': 1,
      'right': 0
    });
  });

  it('doesn\'t update the votes when updateVotes is called with an invalid vote', () => {
    const votingHandler = new VotingHandler(testConfig);

    votingHandler.updateVotes('down', 1);

    expect(votingHandler._votes).toEqual({
      'left': 0,
      'right': 0
    });
  });

  it('returns the most popular vote when getChosenVote is called and there is one highest vote', () => {
    const votingHandler = new VotingHandler(testConfig);

    votingHandler.updateVotes('left', 2);
    votingHandler.updateVotes('right', 1);

    expect(votingHandler.getChosenVote()).toBe('left');
  });

  it('stops the collector when stop is called', () => {
    const mockMessage = {
      createReactionCollector: () => ({
        stop: jest.fn(),
        on: jest.fn()
      }),
    };
    const mockCompletionAction = jest.fn();

    const votingHandler = new VotingHandler(testConfig);


    votingHandler.collectVotes(mockMessage, mockCompletionAction);

    votingHandler.stop();

    expect(votingHandler._collector.stop).toHaveBeenCalledTimes(1);
  });
});
