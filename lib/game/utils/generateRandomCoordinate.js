const clampNumber = require('./clampNumber');

module.exports = function generateRandomCoordinate(min, max) {
  return clampNumber(
    Math.floor(Math.random() * max),
    min,
    max - 2
  );
};
