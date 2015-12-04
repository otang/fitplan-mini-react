(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      questions: Store.getQuestions(),
      answers: Store.getAnswers(),
      currentQuestion: Store.getCurrentQuestion()
    };
  },
  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },
  changeState: function changeState() {
    this.setState({
      questions: Store.getQuestions(),
      answers: Store.getAnswers(),
      currentQuestion: Store.getCurrentQuestion()
    });
  },

  // addMessage: function (event) {
  //   event.preventDefault();
  //   var input = this.refs.newMessage.getDOMNode();
  //   actions.addMessage(input.value);
  //   this.setState({
  //     newMessage: ''
  //   });
  // },
  // updateNewMessage: function (event) {
  //   this.setState({
  //     newMessage: event.target.value
  //   });
  // },
  renderQuestion: function renderQuestion(question, index) {
    if (index !== this.state.currentQuestion) return;
    switch (question.type) {
      case "multiple_choice":
        return React.createElement(MultipleChoiceQuestion, { key: index, question: question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question', key: index },
          question.title
        );
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { id: 'questionnaire' },
      React.createElement(
        'div',
        { className: 'questions' },
        this.state.questions.map(this.renderQuestion)
      )
    );
  }

});

module.exports = App;

},{"./MultipleChoiceQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

// #todo - Module/mixins
var questionMethods = {};

var MultipleChoiceQuestion = React.createClass({
  displayName: 'MultipleChoiceQuestion',

  // getInitialState: function () {
  //   return {
  //     // questions: Store.getQuestions(),
  //     // answers: Store.getAnswers()
  //   };
  // },
  // componentWillMount: function () {
  //   Store.addChangeListener(this.changeState);
  // },
  // componentWillUnmount: function () {
  //   Store.removeChangeListener(this.changeState);
  // },
  // changeState: function () {
  //   this.setState({
  //     // questions: Store.getQuestions(),
  //     // answers: Store.getAnswers()
  //   });
  // },

  // addMessage: function (event) {
  //   event.preventDefault();
  //   var input = this.refs.newMessage.getDOMNode();
  //   actions.addMessage(input.value);
  //   this.setState({
  //     newMessage: ''
  //   });
  // },
  // updateNewMessage: function (event) {
  //   this.setState({
  //     newMessage: event.target.value
  //   });
  // },
  renderChoice: function renderChoice(choice, index) {
    return React.createElement(
      'li',
      { key: index },
      React.createElement('img', { src: 'http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg' }),
      choice.title
    );
  },

  render: function render() {
    return React.createElement(
      'ul',
      null,
      this.props.question.choices.map(this.renderChoice)
    );
  }

});

module.exports = MultipleChoiceQuestion;

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');
var questions = require('./questions.json');

module.exports = flux.createStore({
  answers: [],
  currentQuestion: 0,
  questions: questions,
  actions: [actions.answerQuestion],
  answerQuestion: function answerQuestion(value) {
    console.log('Answering question #' + this.currentQuestion + ': ' + value);
    this.answers[this.currentQuestion] = value;
    this.emitChange();
  },
  reset: function reset() {
    this.answers = [];
    this.currentQuestion = 0;
    this.emitChange();
  },
  previousQuestion: function previousQuestion() {
    if (this.currentQuestion <= 0) return 0;
    this.currentQuestion -= 1;
    this.emitChange();
  },
  nextQuestion: function nextQuestion() {
    if (this.currentQuestion >= this.questions.length - 1) return this.questions.length - 1;
    this.currentQuestion += 1;
    this.emitChange();
  },
  exports: {
    getAnswers: function getAnswers() {
      return this.answers;
    },
    getQuestions: function getQuestions() {
      return this.questions;
    },
    getCurrentQuestion: function getCurrentQuestion() {
      return this.currentQuestion;
    }
  }
});

},{"./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","./questions.json":"/Users/MacBook/www/fitplan-mini-project/app/questions.json","flux-react":"flux-react"}],"/Users/MacBook/www/fitplan-mini-project/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['answerQuestion', 'reset', 'previousQuestion', 'nextQuestion']);

},{"flux-react":"flux-react"}],"/Users/MacBook/www/fitplan-mini-project/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');
React.render(React.createElement(App, null), document.body);

},{"./App.js":"/Users/MacBook/www/fitplan-mini-project/app/App.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/questions.json":[function(require,module,exports){
module.exports=[
  {
    "title": "Choose Your Gender",
    "type": "multiple_choice",
    "choices": [
      {"title": "Male", "image": "/images/xxx.jpg"},
      {"title": "Female", "image": "/images/xxx.jpg"}
    ]
  },
  {
    "title": "What is Your Age?",
    "type": "number"
  },
  {
    "title": "What is Your Height?",
    "type": "height"
  },
  {
    "title": "Choose Your Main Goal",
    "type": "multiple_choice",
    "choices": [
      {"title": "Build Muscle", "image": "/images/xxx.jpg"},
      {"title": "Lose Fat", "image": "/images/xxx.jpg"},
      {"title": "Transform", "image": "/images/xxx.jpg"}
    ]
  },
  {
    "title": "How much fat do you want to lose?",
    "type": "slider",
    "options": {
      "min": 0,
      "max": 4,
      "min_label": "A Little",
      "max_label": "A Lot"
    }
  }
]
},{}]},{},["/Users/MacBook/www/fitplan-mini-project/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0FwcC5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvU3RvcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL2FjdGlvbnMuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL21haW4uanMiLCJhcHAvcXVlc3Rpb25zLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXBFLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxlQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUMvQixhQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUMzQixxQkFBZSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtLQUM1QyxDQUFDO0dBQ0g7QUFDRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDO0FBQ0Qsc0JBQW9CLEVBQUUsZ0NB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QUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLGdCQUFnQixFQUNoQixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGNBQWMsQ0FDZixDQUFDLENBQUM7Ozs7O0FDUEgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsT0FBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FDRnBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gPSByZXF1aXJlKCcuL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBxdWVzdGlvbnM6IFN0b3JlLmdldFF1ZXN0aW9ucygpLFxuICAgICAgYW5zd2VyczogU3RvcmUuZ2V0QW5zd2VycygpLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBTdG9yZS5nZXRDdXJyZW50UXVlc3Rpb24oKVxuICAgIH0pO1xuICB9LFxuXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbiwgaW5kZXgpIHtcbiAgICBpZihpbmRleCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UXVlc3Rpb24pIHJldHVybjtcbiAgICBzd2l0Y2gocXVlc3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBcIm11bHRpcGxlX2Nob2ljZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uIGtleT17aW5kZXh9IHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCIga2V5PXtpbmRleH0+e3F1ZXN0aW9uLnRpdGxlfTwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJxdWVzdGlvbm5haXJlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25zXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUucXVlc3Rpb25zLm1hcCh0aGlzLnJlbmRlclF1ZXN0aW9uKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxuLy8gI3RvZG8gLSBNb2R1bGUvbWl4aW5zXG52YXIgcXVlc3Rpb25NZXRob2RzID0ge1xuXG59O1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIC8vIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gIC8vICAgICAvLyBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKClcbiAgLy8gICB9O1xuICAvLyB9LFxuICAvLyBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgLy8gfSxcbiAgLy8gY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgLy8gfSxcbiAgLy8gY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIC8vIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gIC8vICAgICAvLyBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKClcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG5cbiAgLy8gYWRkTWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3TWVzc2FnZS5nZXRET01Ob2RlKCk7XG4gIC8vICAgYWN0aW9ucy5hZGRNZXNzYWdlKGlucHV0LnZhbHVlKTtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6ICcnXG4gIC8vICAgfSk7XG4gIC8vIH0sXG4gIC8vIHVwZGF0ZU5ld01lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gIC8vICAgfSk7XG4gIC8vIH0sXG4gIHJlbmRlckNob2ljZTogZnVuY3Rpb24oY2hvaWNlLCBpbmRleCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIgLz5cbiAgICAgICAge2Nob2ljZS50aXRsZX1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDx1bD5cbiAgICAgICAge3RoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlcy5tYXAodGhpcy5yZW5kZXJDaG9pY2UpfVxuICAgICAgPC91bD5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb247XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgcXVlc3Rpb25zID0gcmVxdWlyZSgnLi9xdWVzdGlvbnMuanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICBhbnN3ZXJzOiBbXSxcbiAgY3VycmVudFF1ZXN0aW9uOiAwLFxuICBxdWVzdGlvbnM6IHF1ZXN0aW9ucyxcbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb25cbiAgXSxcbiAgYW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ0Fuc3dlcmluZyBxdWVzdGlvbiAjJyt0aGlzLmN1cnJlbnRRdWVzdGlvbisnOiAnK3ZhbHVlKTtcbiAgICB0aGlzLmFuc3dlcnNbdGhpcy5jdXJyZW50UXVlc3Rpb25dID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IDA7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHByZXZpb3VzUXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uIDw9IDApIHJldHVybiAwO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uIC09IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPj0gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xKSByZXR1cm4gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uICs9IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRBbnN3ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnN3ZXJzO1xuICAgIH0sXG4gICAgZ2V0UXVlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnM7XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UXVlc3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRRdWVzdGlvbjtcbiAgICB9LFxuICB9XG59KTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhbnN3ZXJRdWVzdGlvbicsXG4gICdyZXNldCcsXG4gICdwcmV2aW91c1F1ZXN0aW9uJyxcbiAgJ25leHRRdWVzdGlvbidcbl0pOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmJvZHkpO1xuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIEdlbmRlclwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIk1hbGVcIiwgXCJpbWFnZVwiOiBcIi9pbWFnZXMveHh4LmpwZ1wifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiRmVtYWxlXCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBNYWluIEdvYWxcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJCdWlsZCBNdXNjbGVcIiwgXCJpbWFnZVwiOiBcIi9pbWFnZXMveHh4LmpwZ1wifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiTG9zZSBGYXRcIiwgXCJpbWFnZVwiOiBcIi9pbWFnZXMveHh4LmpwZ1wifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiVHJhbnNmb3JtXCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiSG93IG11Y2ggZmF0IGRvIHlvdSB3YW50IHRvIGxvc2U/XCIsXG4gICAgXCJ0eXBlXCI6IFwic2xpZGVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwibWluXCI6IDAsXG4gICAgICBcIm1heFwiOiA0LFxuICAgICAgXCJtaW5fbGFiZWxcIjogXCJBIExpdHRsZVwiLFxuICAgICAgXCJtYXhfbGFiZWxcIjogXCJBIExvdFwiXG4gICAgfVxuICB9XG5dIl19
