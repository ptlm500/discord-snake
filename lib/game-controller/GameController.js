const logger = require('../logger');
const { reactToWithEmojis } = require('./utils');
const Game = require('../game');
const VotingHandler = require('./voting-handler');
const config = require('../../config.json');

module.exports = class GameController {
  constructor(client) {
    this.game = new Game(config.gameHeight, config.gameWidth);
    this._client = client;
    this.advanceGame = this.advanceGame.bind(this);
  }

  async handleNewGameMessage(message) {
    this.currentGameMessage = message;
    if (this.votingHandler || this.game.gameOver) {
      this.votingHandler.stop();
    }

    if (!this.game.gameOver) {
      reactToWithEmojis(message, Object.keys(config.controlEmojis));
      this._createVotingHandler(message);
    }
  }

  _createVotingHandler(message) {
    this.votingHandler =
      new VotingHandler({
        clientUserId: this._client.user.id,
        voteTimerInSecs: config.voteTimerInSecs,
        controlEmojis: config.controlEmojis
      });

    this.votingHandler.collectVotes(message, this.advanceGame);
  }

  async advanceGame(message, nextMove) {
    logger.info({message: 'Advancing with move', nextMove});
    this.game.tick(nextMove);
    await message.reply(this.game.message, {reply: false});
    if (!this.game.gameOver && config.deletePreviousMessages) {
      await message.delete();
    }
  }

  stopVoteCollection() {
    if (this.votingHandler) {
      try {
        this.votingHandler.stop();
        logger.debug('Stopped votingHandler');
      } catch (error) {
        logger.error('Failed to stop votingHandler', error);
      }
    }
  }

  start() {
    this.game.start();

    return this.game.message;
  }

  restart() {
    logger.info({message: 'Restarting game controller'});
    this.game = new Game(config.gameHeight, config.gameWidth);
    this.game.start();

    return this.game.message;
  }

  resume() {
    logger.info({message: 'Resuming game controller'});
    if (this.votingHandler) {
      const chosenVote = this.votingHandler.getChosenVote();
      // This will prevent game over messages from sending if the server dies on a game over tick
      if (!this.game.gameOver && chosenVote && this.currentGameMessage) {
        this.advanceGame(this.currentGameMessage, chosenVote);
      }
    }
  }
};
