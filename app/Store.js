var flux = require('flux-react');
var actions = require('./actions.js');
var questions = require('./questions.json');

module.exports = flux.createStore({
  answers: [],
  currentQuestion: 0,
  questions: questions,
  page: 'questionnaire',

  actions: [
    actions.answerQuestion,
    actions.reset,
    actions.previousQuestion,
    actions.nextQuestion
  ],
  answerQuestion: function(value) {
    console.log('Answering question #'+this.currentQuestion+': '+value);
    this.answers[this.currentQuestion] = value;
    this.emitChange();
  },
  reset: function() {
    this.answers = [];
    this.currentQuestion = 0;
    this.emitChange();
  },
  previousQuestion: function() {
    if(this.currentQuestion <= 0) return 0;
    this.currentQuestion -= 1;
    this.emitChange();
  },
  nextQuestion: function() {
    if(this.currentQuestion >= this.questions.length -1) return this.questions.length -1;
    this.currentQuestion += 1;
    this.emitChange();
  },
  exports: {
    getAnswers: function () {
      return this.answers;
    },
    getQuestions: function () {
      return this.questions;
    },
    getCurrentQuestion: function () {
      return this.currentQuestion;
    },
    getPage: function() {
      return this.page;
    },
    setPage: function(page) {
      this.page = page;
      this.emitChange();
    }
  }
});
