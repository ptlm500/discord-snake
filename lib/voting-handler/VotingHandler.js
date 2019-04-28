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
  constructor(controlEmojis) {
    const votes = {};
    Object.values(controlEmojis).forEach(emoji => {
      votes[emoji] = 0;
    });

    this._votes = votes;
  }

  updateVotes(vote, count) {
    if (this._votes.hasOwnProperty(vote)) {
      this._votes[vote] = count;
    }
    console.log('Updated votes', this._votes);
  }

  getChosenVote() {
    const maxCount = getMaxVoteCount(this._votes);
    const mostPopularOptions = getMostPopularVotes(this._votes, maxCount);

    const chosenIndex = Math.floor(Math.random() * mostPopularOptions.length);
    const chosenVote = mostPopularOptions[chosenIndex];
    console.log('Chosen vote', chosenVote);
    return chosenVote;
  }
};
