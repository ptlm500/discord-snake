const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./secrets.json');
const Game = require('./lib/game/Game');

const game = new Game(40, 20);

client.once('ready', () => {
  console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
  switch(message.content) {
  case 'render':
    message.reply(game.render(), {reply: false});
    break;
  case 'r':
    game.tick('right');
    message.reply(game.render(), {reply: false});
    break;
  case 'l':
    game.tick('left');
    message.reply(game.render(), {reply: false});
    break;
  case 'u':
    game.tick('up');
    message.reply(game.render(), {reply: false});
    break;
  case 'd':
    game.tick('down');
    message.reply(game.render(), {reply: false});
    break;
  default:
    break;
  }
});
