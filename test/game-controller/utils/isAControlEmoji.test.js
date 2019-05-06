/* eslint-env jest */
const { isAControlEmoji } = require('../../../lib/game-controller/utils');


describe('isAControlEmoji', () => {
  it('returns false if the input emoji string is not in the controlEmoji list', () => {
    expect(isAControlEmoji('🔼', {'◀': 'left', '▶': 'right'})).toBeFalsy();
  });

  it('returns true if the input emoji string is in the controlEmoji list', () => {
    expect(isAControlEmoji('▶', {'◀': 'left', '▶': 'right'})).toBeTruthy();
  });
});
