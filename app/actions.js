var flux = require('flux-react');

module.exports = flux.createActions([
  'answerQuestion',
  'reset',
  'previousQuestion',
  'nextQuestion'
]);