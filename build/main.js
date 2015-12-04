(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  displayName: 'MultipleChoiceQuestion',

  handleSelectChoice: function handleSelectChoice(selectedChoice) {
    this.props.onAnswerQuestion(selectedChoice.value);
  },
  renderChoice: function renderChoice(choice, index) {
    return React.createElement(
      'li',
      { key: index },
      React.createElement(MultipleChoiceQuestionChoice, { onSelectChoice: this.handleSelectChoice, choice: choice, choices: this.props.question.choices })
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

  handleClick: function handleClick() {
    this.props.onSelectChoice(this.props.choice);
  },

  render: function render() {
    return React.createElement(
      'div',
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

  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();

    this.props.onAnswerQuestion(this.state.value);
  },

  handleValueChange: function handleValueChange(e) {
    this.setState({ value: e.target.value });
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
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', { name: 'number', onChange: this.handleValueChange, value: this.state.value }),
        React.createElement('input', { type: 'submit', value: 'Next' })
      )
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
			this.props.currentQuestion + 1,
			' / ',
			this.props.totalQuestions
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
        return React.createElement(NumberQuestion, { key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question', key: index, onAnswerQuestion: this.handleAnswerQuestion },
          question.title
        );
    }
  },

  handleClickBackButton: function handleClickBackButton(e) {
    e.preventDefault();
    actions.previousQuestion();
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ProgressBar, { currentQuestion: this.state.currentQuestion, totalQuestions: this.state.questions.length }),
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL051bWJlclF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9Qcm9ncmVzc0Jhci5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUXVlc3Rpb25uYWlyZS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvU3RvcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL2FjdGlvbnMuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL21haW4uanMiLCJhcHAvcXVlc3Rpb25zLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksNEJBQTRCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7O0FBRWhGLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzdDLG9CQUFrQixFQUFFLDRCQUFTLGNBQWMsRUFBRTtBQUMzQyxRQUFJLENB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZS5qcycpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgaGFuZGxlU2VsZWN0Q2hvaWNlOiBmdW5jdGlvbihzZWxlY3RlZENob2ljZSkge1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbihzZWxlY3RlZENob2ljZS52YWx1ZSk7XG4gIH0sXG4gIHJlbmRlckNob2ljZTogZnVuY3Rpb24oY2hvaWNlLCBpbmRleCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkga2V5PXtpbmRleH0+XG4gICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlIG9uU2VsZWN0Q2hvaWNlPXt0aGlzLmhhbmRsZVNlbGVjdENob2ljZX0gY2hvaWNlPXtjaG9pY2V9IGNob2ljZXM9e3RoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlc30+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gIFx0XHRcdDx1bD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5xdWVzdGlvbi5jaG9pY2VzLm1hcCh0aGlzLnJlbmRlckNob2ljZSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb247XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0Q2hvaWNlKHRoaXMucHJvcHMuY2hvaWNlKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICA8aW1nIHNyYz17dGhpcy5wcm9wcy5jaG9pY2UuaW1hZ2V9IC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNob2ljZS50aXRsZX1cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIE51bWJlclF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbih0aGlzLnN0YXRlLnZhbHVlKTtcbiAgfSxcblxuICBoYW5kbGVWYWx1ZUNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJudW1iZXJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVWYWx1ZUNoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlclF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIFByb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmN1cnJlbnRRdWVzdGlvbisxfSAvIHt0aGlzLnByb3BzLnRvdGFsUXVlc3Rpb25zfTwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vUHJvZ3Jlc3NCYXIuanMnKTtcbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzJyk7XG52YXIgTnVtYmVyUXVlc3Rpb24gPSByZXF1aXJlKCcuL051bWJlclF1ZXN0aW9uLmpzJyk7XG5cblxuXG52YXIgUXVlc3Rpb25uYWlyZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBxdWVzdGlvbnM6IFN0b3JlLmdldFF1ZXN0aW9ucygpLFxuICAgICAgYW5zd2VyczogU3RvcmUuZ2V0QW5zd2VycygpLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBTdG9yZS5nZXRDdXJyZW50UXVlc3Rpb24oKVxuICAgIH0pO1xuICB9LFxuXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG4gIGhhbmRsZUFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uKGFuc3dlcik7XG4gICAgYWN0aW9ucy5uZXh0UXVlc3Rpb24oKTtcbiAgfSxcblxuICByZW5kZXJRdWVzdGlvbjogZnVuY3Rpb24gKHF1ZXN0aW9uLCBpbmRleCkge1xuICAgIGlmKGluZGV4ICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbikgcmV0dXJuO1xuICAgIHN3aXRjaChxdWVzdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIFwibXVsdGlwbGVfY2hvaWNlXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24ga2V5PXtpbmRleH0gb25BbnN3ZXJRdWVzdGlvbj17dGhpcy5oYW5kbGVBbnN3ZXJRdWVzdGlvbn0gcXVlc3Rpb249e3F1ZXN0aW9ufT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE51bWJlclF1ZXN0aW9uIGtleT17aW5kZXh9IHZhbHVlPXt0aGlzLnN0YXRlLmFuc3dlcnNbaW5kZXhdfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvTnVtYmVyUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIiBrZXk9e2luZGV4fSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufT57cXVlc3Rpb24udGl0bGV9PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUNsaWNrQmFja0J1dHRvbjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24oKTtcbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9ncmVzc0JhciBjdXJyZW50UXVlc3Rpb249e3RoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9ufSB0b3RhbFF1ZXN0aW9ucz17dGhpcy5zdGF0ZS5xdWVzdGlvbnMubGVuZ3RofT48L1Byb2dyZXNzQmFyPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25zXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUucXVlc3Rpb25zLm1hcCh0aGlzLnJlbmRlclF1ZXN0aW9uKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnZ3JheSd9fT5cbiAgICAgICAgICA8c21hbGw+QW5zd2Vyczoge0pTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuYW5zd2Vycyl9PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYmFja0J1dHRvblwiIGhyZWYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JhY2tCdXR0b259PmJhY2s8L2E+XG5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb25uYWlyZTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcbnZhciBxdWVzdGlvbnMgPSByZXF1aXJlKCcuL3F1ZXN0aW9ucy5qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIGFuc3dlcnM6IFtdLFxuICBjdXJyZW50UXVlc3Rpb246IDAsXG4gIHF1ZXN0aW9uczogcXVlc3Rpb25zLFxuICBhY3Rpb25zOiBbXG4gICAgYWN0aW9ucy5hbnN3ZXJRdWVzdGlvbixcbiAgICBhY3Rpb25zLnJlc2V0LFxuICAgIGFjdGlvbnMucHJldmlvdXNRdWVzdGlvbixcbiAgICBhY3Rpb25zLm5leHRRdWVzdGlvblxuICBdLFxuICBhbnN3ZXJRdWVzdGlvbjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnQW5zd2VyaW5nIHF1ZXN0aW9uICMnK3RoaXMuY3VycmVudFF1ZXN0aW9uKyc6ICcrdmFsdWUpO1xuICAgIHRoaXMuYW5zd2Vyc1t0aGlzLmN1cnJlbnRRdWVzdGlvbl0gPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYW5zd2VycyA9IFtdO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uID0gMDtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgcHJldmlvdXNRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPD0gMCkgcmV0dXJuIDA7XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gLT0gMTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA+PSB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLTEpIHJldHVybiB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLTE7XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gKz0gMTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgZXhwb3J0czoge1xuICAgIGdldEFuc3dlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFuc3dlcnM7XG4gICAgfSxcbiAgICBnZXRRdWVzdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ucztcbiAgICB9LFxuICAgIGdldEN1cnJlbnRRdWVzdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFF1ZXN0aW9uO1xuICAgIH0sXG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ2Fuc3dlclF1ZXN0aW9uJyxcbiAgJ3Jlc2V0JyxcbiAgJ3ByZXZpb3VzUXVlc3Rpb24nLFxuICAnbmV4dFF1ZXN0aW9uJ1xuXSk7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBRdWVzdGlvbm5haXJlID0gcmVxdWlyZSgnLi9RdWVzdGlvbm5haXJlLmpzJyk7XG5SZWFjdC5yZW5kZXIoPFF1ZXN0aW9ubmFpcmUvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXN0aW9ubmFpcmUnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiQ2hvb3NlIFlvdXIgR2VuZGVyXCIsXG4gICAgXCJ0eXBlXCI6IFwibXVsdGlwbGVfY2hvaWNlXCIsXG4gICAgXCJjaG9pY2VzXCI6IFtcbiAgICAgIHtcInRpdGxlXCI6IFwiTWFsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJtYWxlXCJ9LFxuICAgICAge1widGl0bGVcIjogXCJGZW1hbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwiZmVtYWxlXCJ9XG4gICAgXVxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBBZ2U/XCIsXG4gICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJXaGF0IGlzIFlvdXIgSGVpZ2h0P1wiLFxuICAgIFwidHlwZVwiOiBcImhlaWdodFwiXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiQ2hvb3NlIFlvdXIgTWFpbiBHb2FsXCIsXG4gICAgXCJ0eXBlXCI6IFwibXVsdGlwbGVfY2hvaWNlXCIsXG4gICAgXCJjaG9pY2VzXCI6IFtcbiAgICAgIHtcInRpdGxlXCI6IFwiQnVpbGQgTXVzY2xlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImJ1aWxkX211c2NsZVwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiTG9zZSBGYXRcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwibG9zZV9mYXRcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIlRyYW5zZm9ybVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJ0cmFuc2Zvcm1cIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiSG93IG11Y2ggZmF0IGRvIHlvdSB3YW50IHRvIGxvc2U/XCIsXG4gICAgXCJ0eXBlXCI6IFwic2xpZGVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwibWluXCI6IDAsXG4gICAgICBcIm1heFwiOiA0LFxuICAgICAgXCJtaW5fbGFiZWxcIjogXCJBIExpdHRsZVwiLFxuICAgICAgXCJtYXhfbGFiZWxcIjogXCJBIExvdFwiXG4gICAgfVxuICB9XG5dIl19
