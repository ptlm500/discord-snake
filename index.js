const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./secrets.json');
const Game = require('./lib/game/Game');

const game = new Game(20, 20);

client.once('ready', () => {
  console.log('Ready!');
});

client.login(config.token);

let collector;

function collectorFilter(reaction, user) {
  if (user.id === client.user.id) {
    return false;
  }
  return true;
}

const controlEmojis = ['◀', '▶', '🔼', '🔽'];

client.on('message', message => {
  if (message.author.id === client.user.id) {
    if (collector) {
      collector.stop();
    }
    Promise.all(
      controlEmojis.map(async emoji => await message.react(emoji))
    );
    collector = message.createReactionCollector(collectorFilter);

    collector.on('collect', (reaction) => {
      switch(reaction.emoji.name) {
      case controlEmojis[1]:
        game.tick('right');
        message.reply(game.render(), {reply: false});
        break;
      case controlEmojis[0]:
        game.tick('left');
        message.reply(game.render(), {reply: false});
        break;
      case controlEmojis[2]:
        game.tick('up');
        message.reply(game.render(), {reply: false});
        break;
      case controlEmojis[3]:
        game.tick('down');
        message.reply(game.render(), {reply: false});
        break;
      default:
        break;
      }
    });
  }

  switch(message.content) {
  case 'render':
    message.reply(game.render(), {reply: false});
    break;
  default:
    break;
  }
});
