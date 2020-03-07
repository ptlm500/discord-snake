require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const GameController = require('./lib/game-controller');
const logger = require('./lib/logger');

const info = {
  restarts: 0
};

let gameController;

client.once('ready', () => {
  gameController = new GameController(client);
  logger.info({message: 'Client ready!'});
});

client.login(process.env.DISCORD_TOKEN);

client.on('error', error => {
  logger.error('Error Occurred', error);

  if (error.error && error.error.code === 'ECONNRESET') {
    restartClient();
  }
});

client.on('disconnect', async () => {
  logger.warn('Socket disconnected');
});

client.on('message', message => {
  handleAdminMessage(message);

  handleCountingMessage(message);

  handleCommand(message);

  if (message.channel.id === process.env.ALLOWED_CHANNEL) {
    if (message.author.id === client.user.id) {
      gameController.handleNewGameMessage(message);
    }

    switch(message.content) {
    case `${config.prefix}render`:
      logger.info('Rendered by %s', message.author.username);
      message.reply(gameController.start(), {reply: false});
      break;
    case `${config.prefix}restart`:
      logger.info('Game restarted by %s', message.author.username);
      message.reply(gameController.restart(), {reply: false});
      break;
    default:
      break;
    }
  }
});

async function restartClient() {
  info.restarts = info.restarts + 1;
  gameController.stopVoteCollection();
  logger.info('Restarting client');
  try {
    await client.destroy();
    logger.info('Old client destroyed');
  } catch (error) {
    logger.error('Failed to destroy old client', error);
    return;
  }

  await attemptLogin();

  gameController.resume();
}

async function attemptLogin(retries = 3) {
  let loginError;
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; i++) {
      try {
        await client.login(process.env.DISCORD_TOKEN);
        logger.info('Logged in');
        resolve('Logged in');
        break;
      } catch (error) {
        logger.warn('Failed to login', error);
        loginError = error;
      }
    }
    if (loginError) {
      logger.error('Failed to login', loginError);
      reject(loginError);
    }
  });
}

function getStatus() {
  return `
uptime:   ${client.uptime}
restarts: ${info.restarts}
  `;
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

function handleCountingMessage(message) {
  const randomInt = Math.random();
  if (randomInt > 0.5 && message.channel.id === '657199994927054859' && message.author.id !== client.user.id) {
    message.reply(`${randomInt * 100000000000000000}`);
  }
}

function handleCommand(message) {
  if (message.content.charAt(0) === '/') {
    if (message.content.substring(1, 5) === 'code' && message.channel.id === '657199994927054859' && message.author.id !== client.user.id) {
      const superSafeString = message.content.repeat(1);
      eval(superSafeString.split(/(?<=^\S+)\s/)[0]);
    }
  }
}
