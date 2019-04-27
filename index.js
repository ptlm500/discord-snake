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

const controlEmojis = {
  '◀': 'left',
  '▶': 'right',
  '🔼': 'up',
  '🔽': 'down'
};

async function reactTo(message) {
  for (const emoji of Object.keys(controlEmojis)) {
    try {
      await message.react(emoji);
    } catch(e) {
      return e;
    }
  }
}

function advanceGame(message, nextMove) {
  game.tick(nextMove);
  message.reply(game.render(), {reply: false});
  message.delete();
}

client.on('message', message => {
  if (message.author.id === client.user.id) {
    if (collector) {
      collector.stop();
    }

    reactTo(message);

    collector = message.createReactionCollector(collectorFilter);
    let nextMove;
    collector.on('collect', (reaction) => {
      nextMove = controlEmojis[reaction.emoji.name];
      nextMove && advanceGame(message, nextMove);
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
