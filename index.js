require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Game = require('./lib/game/Game');
const VotingHandler = require('./lib/voting-handler/VotingHandler');
const logger = require('./lib/logger');

let game;

client.once('ready', () => {
  game = new Game(config.gameHeight, config.gameWidth);
  logger.info({message: 'Ready!'});
});

client.login(process.env.DISCORD_TOKEN);

let collector;

function collectorFilter(reaction, user) {
  if (user.id === client.user.id) {
    return false;
  } else if (!isAControlEmoji(reaction.emoji.name, controlEmojis)) {
    return false;
  }
  return true;
}

function isAControlEmoji(emoji, controlEmojis) {
  return Object.keys(controlEmojis).includes(emoji);
}

const controlEmojis = {
  '◀': 'left',
  '▶': 'right',
  '🔼': 'up',
  '🔽': 'down'
};

client.on('message', message => {
  if (message.author.id === client.user.id) {
    if (collector || game.gameOver) {
      collector.stop();
    }

    if (!game.gameOver) {
      let votingTimerStarted = false;
      const votingHandler = new VotingHandler(controlEmojis);

      reactToWithEmojis(message, Object.keys(controlEmojis));

      collector = message.createReactionCollector(collectorFilter);
      collector.on('collect', (reaction) => {
        if (!votingTimerStarted) {
          setTimeout(
            () => advanceGame(message, votingHandler.getChosenVote()),
            config.voteTimerInSecs * 1000
          );

          votingTimerStarted = true;
          logger.info({message: 'Started voting timer'});
        }
        logger.info({
          message: 'Adding vote',
          name: reaction.emoji.name,
          move: controlEmojis[reaction.emoji.name]
        });
        votingHandler.updateVotes(controlEmojis[reaction.emoji.name], reaction.count - 1);
      });
    }
  }

  if (message.content.startsWith(config.prefix)) {
    switch(message.content) {
    case `${config.prefix}render`:
      logger.info('Rendered by %s', message.author.username);
      game.start();
      message.reply(game.message, {reply: false});
      break;
    case `${config.prefix}restart`:
      logger.info('Restarted by %s', message.author.username);
      game = new Game(config.gameHeight, config.gameWidth);
      game.start();
      message.reply(game.message, {reply: false});
      break;
    default:
      break;
    }
  }
});

async function reactToWithEmojis(message, emojis) {
  for (const emoji of emojis) {
    try {
      await message.react(emoji);
    } catch(e) {
      return;
    }
  }
}

async function advanceGame(message, nextMove) {
  logger.info({message: 'Advancing with move', nextMove});
  game.tick(nextMove);
  await message.reply(game.message, {reply: false});
  if (!game.gameOver) {
    await message.delete();
  }
}
