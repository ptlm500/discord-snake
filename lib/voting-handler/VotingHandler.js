const logger = require('../logger');
const { isAControlEmoji } = require('../game-controller/utils');

function getMaxVoteCount(votes) {
  let maxCount = 0;
  Object.values(votes).forEach(count => {
    maxCount = count > maxCount ? count : maxCount;
  });

  return maxCount;
}

function getMostPopularVotes(votes, maxCount) {
  const mostPopularOptions = [];

  Object.keys(votes).forEach(vote => {
    if (votes[vote] === maxCount) {
      mostPopularOptions.push(vote);
    }
  });

  return mostPopularOptions;
}

module.exports = class VotingHandler {
  constructor(config) {
    const votes = {};
    Object.values(config.controlEmojis).forEach(emoji => {
      votes[emoji] = 0;
    });

    this._clientUserId = config.clientUserId;
    this._voteTimerInSecs = config.voteTimerInSecs;
    this._controlEmojis = config.controlEmojis;
    this._votes = votes;
    this._votingTimerStarted = false;
    this._collectorFilter = this._collectorFilter.bind(this);
  }

  collectVotes(message, completionAction) {
    this._collector = message.createReactionCollector(this._collectorFilter);
    this._collector.on('collect', (reaction) => {
      if (!this._votingTimerStarted) {
        this._onTick = setTimeout(
          () => completionAction(message, this.getChosenVote()),
          this._voteTimerInSecs * 1000
        );

        this.votingTimerStarted = true;
        logger.debug({message: 'Started voting timer'});
      }
      logger.debug({
        message: 'Adding vote',
        name: reaction.emoji.name,
        move: this._controlEmojis[reaction.emoji.name]
      });
      this.updateVotes(
        this._controlEmojis[reaction.emoji.name],
        // Subtract 1 to avoid counting the bot's reactions
        reaction.count - 1
      );
    });
  }

  _collectorFilter(reaction, user) {
    if (user.id === this._clientUserId) {
      return false;
    } else if (!isAControlEmoji(reaction.emoji.name, this._controlEmojis)) {
      return false;
    }
    return true;
  }

  updateVotes(vote, count) {
    if (this._votes.hasOwnProperty(vote)) {
      this._votes[vote] = count;
    }

    logger.debug({message: 'Updated votes', votes: this._votes});
  }

  getChosenVote() {
    const maxCount = getMaxVoteCount(this._votes);
    const mostPopularOptions = getMostPopularVotes(this._votes, maxCount);

    const chosenIndex = Math.floor(Math.random() * mostPopularOptions.length);
    const chosenVote = mostPopularOptions[chosenIndex];

    logger.debug({message: 'Chosen vote', chosenVote});
    return chosenVote;
  }

  stop() {
    if (this._collector) {
      try {
        this._collector.stop();
        logger.debug('Stopped reaction collector');
      } catch (error) {
        logger.error('Failed to stop reaction collector', error);
      }
    }

    if (this._onTick) {
      try {
        clearTimeout(this._onTick);
        logger.debug('Stopped old onTick');
      } catch (error) {
        logger.error('Failed to stop old onTick', error);
      }
    }
  }
};
