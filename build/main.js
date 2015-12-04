(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  displayName: 'MultipleChoiceQuestion',

  renderChoice: function renderChoice(choice, index) {
    return React.createElement(
      'li',
      { key: index },
      React.createElement(MultipleChoiceQuestionChoice, { onSelectChoice: this.props.onAnswerQuestion, choice: choice })
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'question' },
      React.createElement(
        'h3',
        null,
        this.props.question.title
      ),
      React.createElement(
        'ul',
        null,
        this.props.question.choices.map(this.renderChoice)
      )
    );
  }
});

module.exports = MultipleChoiceQuestion;

},{"./MultipleChoiceQuestionChoice.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestionChoice.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestionChoice.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var MultipleChoiceQuestionChoice = React.createClass({
  displayName: 'MultipleChoiceQuestionChoice',

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

  handleClick: function handleClick() {
    this.props.onSelectChoice(this.props.choice.value);
  },

  render: function render() {
    return React.createElement(
      'li',
      { onClick: this.handleClick },
      React.createElement('img', { src: this.props.choice.image }),
      this.props.choice.title
    );
  }

});

module.exports = MultipleChoiceQuestionChoice;

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var NumberQuestion = React.createClass({
  displayName: 'NumberQuestion',

  renderChoice: function renderChoice(choice, index) {
    return React.createElement(
      'li',
      { key: index },
      React.createElement(MultipleChoiceQuestionChoice, { onSelectChoice: this.props.onAnswerQuestion, choice: choice })
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'question' },
      React.createElement(
        'h3',
        null,
        this.props.question.title
      ),
      React.createElement('input', { name: 'xxx', value: this.props.value })
    );
  }
});

module.exports = NumberQuestion;

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = React.createClass({
	displayName: 'ProgressBar',

	render: function render() {
		return React.createElement(
			'span',
			null,
			'[============]'
		);
	}

});

module.exports = ProgressBar;

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = require('./ProgressBar.js');
var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');

var Questionnaire = React.createClass({
  displayName: 'Questionnaire',

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

  handleAnswerQuestion: function handleAnswerQuestion(answer) {
    actions.answerQuestion(answer);
    actions.nextQuestion();
  },

  renderQuestion: function renderQuestion(question, index) {
    if (index !== this.state.currentQuestion) return;
    switch (question.type) {
      case "multiple_choice":
        return React.createElement(MultipleChoiceQuestion, { key: index, onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      case "number":
        return React.createElement(NumberQuestion, { key: index, onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question', key: index, onAnswerQuestion: this.handleAnswerQuestion },
          question.title
        );
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ProgressBar, null),
      React.createElement(
        'div',
        { className: 'questions' },
        this.state.questions.map(this.renderQuestion)
      ),
      React.createElement(
        'div',
        { style: { color: 'gray' } },
        React.createElement(
          'small',
          null,
          'Answers: ',
          JSON.stringify(this.state.answers)
        )
      ),
      React.createElement(
        'a',
        { className: 'backButton', href: true, onClick: this.handleClickBackButton },
        'back'
      )
    );
  }

});

module.exports = Questionnaire;

},{"./MultipleChoiceQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js","./NumberQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js","./ProgressBar.js":"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');
var questions = require('./questions.json');

module.exports = flux.createStore({
  answers: [],
  currentQuestion: 0,
  questions: questions,
  actions: [actions.answerQuestion, actions.reset, actions.previousQuestion, actions.nextQuestion],
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
var Questionnaire = require('./Questionnaire.js');
React.render(React.createElement(Questionnaire, null), document.getElementById('questionnaire'));

},{"./Questionnaire.js":"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/questions.json":[function(require,module,exports){
module.exports=[
  {
    "title": "Choose Your Gender",
    "type": "multiple_choice",
    "choices": [
      {"title": "Male", "image": "http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg", "value": "male"},
      {"title": "Female", "image": "http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg", "value": "female"}
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
      {"title": "Build Muscle", "image": "http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg", "value": "build_muscle"},
      {"title": "Lose Fat", "image": "http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg", "value": "lose_fat"},
      {"title": "Transform", "image": "http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg", "value": "transform"}
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL051bWJlclF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9Qcm9ncmVzc0Jhci5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUXVlc3Rpb25uYWlyZS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvU3RvcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL2FjdGlvbnMuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL21haW4uanMiLCJhcHAvcXVlc3Rpb25zLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksNEJBQTRCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7O0FBRWhGLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzdDLGNBQVksRUFBRSxzQkFBUyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3BD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QUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLGFBQWEsT0FBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7O0FDRnpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZS5qcycpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyQ2hvaWNlOiBmdW5jdGlvbihjaG9pY2UsIGluZGV4KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBrZXk9e2luZGV4fT5cbiAgICAgICAgPE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2Ugb25TZWxlY3RDaG9pY2U9e3RoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbn0gY2hvaWNlPXtjaG9pY2V9PjwvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZT5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICBcdFx0XHQ8dWw+XG4gICAgICAgICAge3RoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlcy5tYXAodGhpcy5yZW5kZXJDaG9pY2UpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIC8vIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gIC8vICAgICAvLyBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKClcbiAgLy8gICB9O1xuICAvLyB9LFxuICAvLyBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgLy8gfSxcbiAgLy8gY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgLy8gfSxcbiAgLy8gY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIC8vIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gIC8vICAgICAvLyBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKClcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG5cbiAgLy8gYWRkTWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3TWVzc2FnZS5nZXRET01Ob2RlKCk7XG4gIC8vICAgYWN0aW9ucy5hZGRNZXNzYWdlKGlucHV0LnZhbHVlKTtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6ICcnXG4gIC8vICAgfSk7XG4gIC8vIH0sXG4gIC8vIHVwZGF0ZU5ld01lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gIC8vICAgfSk7XG4gIC8vIH0sXG5cbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RDaG9pY2UodGhpcy5wcm9wcy5jaG9pY2UudmFsdWUpO1xuICB9LFxuXG5cblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgPGltZyBzcmM9e3RoaXMucHJvcHMuY2hvaWNlLmltYWdlfSAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaG9pY2UudGl0bGV9XG4gICAgICA8L2xpPlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIE51bWJlclF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXJDaG9pY2U6IGZ1bmN0aW9uKGNob2ljZSwgaW5kZXgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSBvblNlbGVjdENob2ljZT17dGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9ufSBjaG9pY2U9e2Nob2ljZX0+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwieHh4XCIgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlclF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIFByb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxzcGFuPls9PT09PT09PT09PT1dPC9zcGFuPlxuXG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc0JhcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG52YXIgUHJvZ3Jlc3NCYXIgPSByZXF1aXJlKCcuL1Byb2dyZXNzQmFyLmpzJyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcycpO1xudmFyIE51bWJlclF1ZXN0aW9uID0gcmVxdWlyZSgnLi9OdW1iZXJRdWVzdGlvbi5qcycpO1xuXG5cblxudmFyIFF1ZXN0aW9ubmFpcmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVzdGlvbnM6IFN0b3JlLmdldFF1ZXN0aW9ucygpLFxuICAgICAgYW5zd2VyczogU3RvcmUuZ2V0QW5zd2VycygpLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBTdG9yZS5nZXRDdXJyZW50UXVlc3Rpb24oKVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9KTtcbiAgfSxcblxuXG5cbiAgLy8gYWRkTWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3TWVzc2FnZS5nZXRET01Ob2RlKCk7XG4gIC8vICAgYWN0aW9ucy5hZGRNZXNzYWdlKGlucHV0LnZhbHVlKTtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6ICcnXG4gIC8vICAgfSk7XG4gIC8vIH0sXG4gIC8vIHVwZGF0ZU5ld01lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gIC8vICAgfSk7XG4gIC8vIH0sXG5cblxuICBoYW5kbGVBbnN3ZXJRdWVzdGlvbjogZnVuY3Rpb24oYW5zd2VyKSB7XG4gICAgYWN0aW9ucy5hbnN3ZXJRdWVzdGlvbihhbnN3ZXIpO1xuICAgIGFjdGlvbnMubmV4dFF1ZXN0aW9uKCk7XG4gIH0sXG5cbiAgcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbiwgaW5kZXgpIHtcbiAgICBpZihpbmRleCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UXVlc3Rpb24pIHJldHVybjtcbiAgICBzd2l0Y2gocXVlc3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBcIm11bHRpcGxlX2Nob2ljZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uIGtleT17aW5kZXh9IG9uQW5zd2VyUXVlc3Rpb249e3RoaXMuaGFuZGxlQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxOdW1iZXJRdWVzdGlvbiBrZXk9e2luZGV4fSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvTnVtYmVyUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIiBrZXk9e2luZGV4fSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufT57cXVlc3Rpb24udGl0bGV9PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICB9LFxuXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFByb2dyZXNzQmFyPjwvUHJvZ3Jlc3NCYXI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvbnNcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5xdWVzdGlvbnMubWFwKHRoaXMucmVuZGVyUXVlc3Rpb24pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7Y29sb3I6ICdncmF5J319PlxuICAgICAgICAgIDxzbWFsbD5BbnN3ZXJzOiB7SlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5hbnN3ZXJzKX08L3NtYWxsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YSBjbGFzc05hbWU9XCJiYWNrQnV0dG9uXCIgaHJlZiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrQmFja0J1dHRvbn0+YmFjazwvYT5cblxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBRdWVzdGlvbm5haXJlO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xudmFyIHF1ZXN0aW9ucyA9IHJlcXVpcmUoJy4vcXVlc3Rpb25zLmpzb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgYW5zd2VyczogW10sXG4gIGN1cnJlbnRRdWVzdGlvbjogMCxcbiAgcXVlc3Rpb25zOiBxdWVzdGlvbnMsXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uLFxuICAgIGFjdGlvbnMucmVzZXQsXG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uLFxuICAgIGFjdGlvbnMubmV4dFF1ZXN0aW9uXG4gIF0sXG4gIGFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdBbnN3ZXJpbmcgcXVlc3Rpb24gIycrdGhpcy5jdXJyZW50UXVlc3Rpb24rJzogJyt2YWx1ZSk7XG4gICAgdGhpcy5hbnN3ZXJzW3RoaXMuY3VycmVudFF1ZXN0aW9uXSA9IHZhbHVlO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hbnN3ZXJzID0gW107XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSAwO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBwcmV2aW91c1F1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA8PSAwKSByZXR1cm4gMDtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiAtPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uID49IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMSkgcmV0dXJuIHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiArPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBleHBvcnRzOiB7XG4gICAgZ2V0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYW5zd2VycztcbiAgICB9LFxuICAgIGdldFF1ZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFF1ZXN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50UXVlc3Rpb247XG4gICAgfSxcbiAgfVxufSk7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnYW5zd2VyUXVlc3Rpb24nLFxuICAncmVzZXQnLFxuICAncHJldmlvdXNRdWVzdGlvbicsXG4gICduZXh0UXVlc3Rpb24nXG5dKTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFF1ZXN0aW9ubmFpcmUgPSByZXF1aXJlKCcuL1F1ZXN0aW9ubmFpcmUuanMnKTtcblJlYWN0LnJlbmRlcig8UXVlc3Rpb25uYWlyZS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVlc3Rpb25uYWlyZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBHZW5kZXJcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJNYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcIm1hbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkZlbWFsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJmZW1hbGVcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBNYWluIEdvYWxcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJCdWlsZCBNdXNjbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwiYnVpbGRfbXVzY2xlXCJ9LFxuICAgICAge1widGl0bGVcIjogXCJMb3NlIEZhdFwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJsb3NlX2ZhdFwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiVHJhbnNmb3JtXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcInRyYW5zZm9ybVwifVxuICAgIF1cbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJIb3cgbXVjaCBmYXQgZG8geW91IHdhbnQgdG8gbG9zZT9cIixcbiAgICBcInR5cGVcIjogXCJzbGlkZXJcIixcbiAgICBcIm9wdGlvbnNcIjoge1xuICAgICAgXCJtaW5cIjogMCxcbiAgICAgIFwibWF4XCI6IDQsXG4gICAgICBcIm1pbl9sYWJlbFwiOiBcIkEgTGl0dGxlXCIsXG4gICAgICBcIm1heF9sYWJlbFwiOiBcIkEgTG90XCJcbiAgICB9XG4gIH1cbl0iXX0=
