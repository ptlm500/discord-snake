const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./secrets.json');
const Game = require('./lib/game/Game');
const VotingHandler = require('./lib/voting-handler/VotingHandler');

let game = new Game(20, 20);

client.once('ready', () => {
  console.log('Ready!');
});

client.login(config.token);

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
  console.log('Advancing with move', nextMove);
  game.tick(nextMove);
  await message.reply(game.render(), {reply: false});
  await message.delete();
}

client.on('message', message => {
  if (message.author.id === client.user.id) {
    if (collector) {
      collector.stop();
    }

    let votingTimerStarted = false;
    const votingHandler = new VotingHandler(controlEmojis);

    reactToWithEmojis(message, Object.keys(controlEmojis));

    collector = message.createReactionCollector(collectorFilter);
    collector.on('collect', (reaction) => {
      if (!votingTimerStarted) {
        setTimeout(() =>
          advanceGame(message, votingHandler.getChosenVote()), 2 * 1000);

        votingTimerStarted = true;
        console.log('Started voting timer');
      }
      console.log('Adding vote', reaction.emoji.name, controlEmojis[reaction.emoji.name]);
      votingHandler.updateVotes(controlEmojis[reaction.emoji.name], reaction.count - 1);
    });
  }

  switch(message.content) {
  case 'render':
    message.reply(game.render(), {reply: false});
    break;
  case 'restart':
    game = new Game(20, 20);
    message.reply(game.render(), {reply: false});
    break;
  default:
    break;
  }
});
