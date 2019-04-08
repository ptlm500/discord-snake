const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const World = require('../../../lib/game/world');

let world;
let worldAsString;

Given('a world width {int}, height {int}', function(width, height) {
  world = new World({width, height});
});

When('I render the world as a string', function() {
  worldAsString = world.toString();
});

Then('I expect the world to be', function(result) {
  expect(worldAsString).to.eql(result);
});
