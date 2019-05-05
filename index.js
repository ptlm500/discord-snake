require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Game = require('./lib/game/Game');
const VotingHandler = require('./lib/voting-handler/VotingHandler');
const logger = require('./lib/logger');


const info = {
  restarts: 0
};

let game;
let currentGameMessage;
let votingHandler;
let collector;
let onTick;

client.once('ready', () => {
  game = new Game(config.gameHeight, config.gameWidth);
  logger.info({message: 'Client ready!'});
});

client.login(process.env.DISCORD_TOKEN);

client.on('error', error => {
  logger.error('Error Occurred', error);

  if (error.error && error.error.code === 'ECONNRESET') {
    restartClient();
  }
});

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
  handleAdminMessage(message);

  if (message.channel.id === process.env.ALLOWED_CHANNEL) {
    if (message.author.id === client.user.id) {
      currentGameMessage = message;
      if (collector || game.gameOver) {
        collector.stop();
      }

      if (!game.gameOver) {
        reactToWithEmojis(message, Object.keys(controlEmojis));
        addReactionCollector(message);
      }
    }

    switch(message.content) {
    case `${config.prefix}render`:
      logger.info('Rendered by %s', message.author.username);
      game.start();
      message.reply(game.message, {reply: false});
      break;
    case `${config.prefix}restart`:
      logger.info('Game restarted by %s', message.author.username);
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
    } catch(error) {
      logger.error('Failed to react with emoji', error);
    }
  }
}

async function advanceGame(message, nextMove) {
  logger.info({message: 'Advancing with move', nextMove});
  game.tick(nextMove);
  await message.reply(game.message, {reply: false});
  if (!game.gameOver && config.deletePreviousMessages) {
    await message.delete();
  }
}

async function restartClient() {
  info.restarts = info.restarts + 1;

  if (collector) {
    try {
      collector.stop();
      logger.debug('Stopped collector');
    } catch (error) {
      logger.error('Failed to stop collector', error);
    }
  }

  if (onTick) {
    try {
      clearTimeout(onTick);
      logger.debug('Stopped old onTick');
    } catch (error) {
      logger.error('Failed to stop old onTick', error);
    }
  }

  logger.info('Restarting client');
  try {
    await client.destroy();
    logger.info('Old client destroyed');
  } catch (error) {
    logger.error('Failed to destroy old client', error);
    return;
  }

  try {
    await client.login(process.env.DISCORD_TOKEN);
    logger.info('Logged in');
  } catch (error) {
    logger.error('Failed to login', error);
    return;
  }

  if (currentGameMessage && votingHandler && votingHandler.getChosenVote()) {
    advanceGame(currentGameMessage, votingHandler.getChosenVote());
  }
}

function getStatus() {
  return `
uptime:   ${client.uptime}
restarts: ${info.restarts}
  `;
}

function addReactionCollector(message) {
  let votingTimerStarted = false;
  votingHandler = new VotingHandler(controlEmojis);

  collector = message.createReactionCollector(collectorFilter);
  collector.on('collect', (reaction) => {
    if (!votingTimerStarted) {
      onTick = setTimeout(
        () => advanceGame(message, votingHandler.getChosenVote()),
        config.voteTimerInSecs * 1000
      );

      votingTimerStarted = true;
      logger.debug({message: 'Started voting timer'});
    }
    logger.debug({
      message: 'Adding vote',
      name: reaction.emoji.name,
      move: controlEmojis[reaction.emoji.name]
    });
    votingHandler.updateVotes(controlEmojis[reaction.emoji.name], reaction.count - 1);
  });
}

function handleAdminMessage(message) {
  if (message.channel.type === 'dm') {
    switch(message.content) {
    case `${config.prefix}status`:
      message.reply(getStatus());
      break;
    case `${config.prefix}restartClient`:
      logger.info('Client restarted by %s', message.author.username);
      restartClient();
      break;
    default:
      break;
    }
  }
}
