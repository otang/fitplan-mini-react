(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var HeightQuestion = React.createClass({
  displayName: 'HeightQuestion',

  getInitialState: function getInitialState() {
    var state = {
      height: this.props.value,
      feet: null,
      inches: null
    };

    // ie. 6'10"
    if (state.height && typeof state.height === 'string') {
      console.log('Height value is ' + state.height);
      var matches = state.height.match(/(\d+)/g);
      if (matches && matches.length == 2) {
        state.feet = matches[0];
        state.inches = matches[1];
      }
    }

    return state;
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var height = this.state.feet + "' " + this.state.inches + '"';
    this.props.onAnswerQuestion(height);
  },

  handleFeetChange: function handleFeetChange(e) {
    this.setState({ feet: e.target.value });
  },
  handleInchesChange: function handleInchesChange(e) {
    this.setState({ inches: e.target.value });
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
        React.createElement('input', { name: 'feet', onChange: this.handleFeetChange, value: this.state.feet }),
        React.createElement('input', { name: 'inches', onChange: this.handleInchesChange, value: this.state.inches }),
        React.createElement('input', { type: 'submit', value: 'Next' })
      )
    );
  }
});

module.exports = HeightQuestion;

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  displayName: 'MultipleChoiceQuestion',

  getInitialState: function getInitialState() {
    var state = { selectedChoice: null },
        _this = this;
    this.props.question.choices.forEach(function (choice) {
      if (_this.props.value === choice.value) {
        state.selectedChoice = choice;
      }
    });
    return state;
  },
  handleSelectChoice: function handleSelectChoice(selectedChoice) {
    this.setState({ selectedChoice: selectedChoice });
    this.props.onAnswerQuestion(selectedChoice.value);
  },
  _isSelected: function _isSelected(choice) {
    if (!this.state.selectedChoice) return false;
    if (choice.value === this.state.selectedChoice.value) return true;
  },
  renderChoice: function renderChoice(choice, index) {
    var className = this._isSelected(choice) ? 'selected' : '';
    return React.createElement(
      'li',
      { className: className, key: index },
      React.createElement(MultipleChoiceQuestionChoice, { onSelectChoice: this.handleSelectChoice, choice: choice })
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

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Question.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');
var HeightQuestion = require('./HeightQuestion.js');

var Question = React.createClass({
  displayName: 'Question',

  render: function render() {
    switch (this.props.question.type) {
      case "multiple_choice":
        return React.createElement(MultipleChoiceQuestion, { value: this.props.value, onAnswerQuestion: this.props.onAnswerQuestion, question: this.props.question });
        break;
      case "number":
        return React.createElement(NumberQuestion, { value: this.props.value, onAnswerQuestion: this.props.onAnswerQuestion, question: this.props.question });
        break;
      case "height":
        return React.createElement(HeightQuestion, { value: this.props.value, onAnswerQuestion: this.props.onAnswerQuestion, question: this.props.question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question', value: this.props.value, onAnswerQuestion: this.props.onAnswerQuestion, question: this.props.question },
          question.title
        );
    }
  }
});

module.exports = Question;

},{"./HeightQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js","./MultipleChoiceQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js","./NumberQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = require('./ProgressBar.js');

var Question = require('./Question.js');

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
    return React.createElement(Question, { key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion, question: question });
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

},{"./ProgressBar.js":"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js","./Question.js":"/Users/MacBook/www/fitplan-mini-project/app/Question.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Store.js":[function(require,module,exports){
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
    "title": "What is Your Height?",
    "type": "height"
  },
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0hlaWdodFF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9OdW1iZXJRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUHJvZ3Jlc3NCYXIuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9RdWVzdGlvbm5haXJlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9TdG9yZS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvYWN0aW9ucy5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvbWFpbi5qcyIsImFwcC9xdWVzdGlvbnMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBR3RDLElBQUksY0FBYyxHQUFH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dEIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0FBQ0QsZ0JBQVksRUFBRSx3QkFBWTtBQUN4QixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7QUFDRCxzQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixhQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7S0FDN0I7R0FDRjtDQUNGLENBQUMsQ0FBQzs7Ozs7QUM3Q0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVqQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDbEMsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsY0FBYyxDQUNmLENBQUMsQ0FBQzs7Ozs7QUNQSCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxhQUFhLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7OztBQ0Z6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBIZWlnaHRRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgZmVldDogbnVsbCxcbiAgICAgIGluY2hlczogbnVsbFxuICAgIH1cblxuICAgIC8vIGllLiA2JzEwXCJcbiAgICBpZihzdGF0ZS5oZWlnaHQgJiYgdHlwZW9mIHN0YXRlLmhlaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdIZWlnaHQgdmFsdWUgaXMgJytzdGF0ZS5oZWlnaHQpO1xuICAgICAgdmFyIG1hdGNoZXMgPSBzdGF0ZS5oZWlnaHQubWF0Y2goLyhcXGQrKS9nKTtcbiAgICAgIGlmKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICBzdGF0ZS5mZWV0ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgc3RhdGUuaW5jaGVzID0gbWF0Y2hlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLnN0YXRlLmZlZXQrXCInIFwiK3RoaXMuc3RhdGUuaW5jaGVzKydcIic7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKGhlaWdodCk7XG4gIH0sXG5cbiAgaGFuZGxlRmVldENoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2ZlZXQ6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIGhhbmRsZUluY2hlc0NoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2luY2hlczogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwiZmVldFwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZlZXRDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmZlZXR9IC8+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJpbmNoZXNcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbmNoZXNDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmluY2hlc30gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVpZ2h0UXVlc3Rpb247XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UgPSByZXF1aXJlKCcuL011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UuanMnKTtcblxudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGF0ZSA9IHtzZWxlY3RlZENob2ljZTogbnVsbH1cbiAgICAgICwgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGNob2ljZSkge1xuICAgICAgaWYoX3RoaXMucHJvcHMudmFsdWUgPT09IGNob2ljZS52YWx1ZSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3RlZENob2ljZSA9IGNob2ljZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG4gIGhhbmRsZVNlbGVjdENob2ljZTogZnVuY3Rpb24oc2VsZWN0ZWRDaG9pY2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZENob2ljZTogc2VsZWN0ZWRDaG9pY2V9KTtcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24oc2VsZWN0ZWRDaG9pY2UudmFsdWUpO1xuICB9LFxuICBfaXNTZWxlY3RlZDogZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgaWYoICF0aGlzLnN0YXRlLnNlbGVjdGVkQ2hvaWNlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoY2hvaWNlLnZhbHVlID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkQ2hvaWNlLnZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgcmVuZGVyQ2hvaWNlOiBmdW5jdGlvbihjaG9pY2UsIGluZGV4KSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuX2lzU2VsZWN0ZWQoY2hvaWNlKSA/ICdzZWxlY3RlZCcgOiAnJztcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBrZXk9e2luZGV4fT5cbiAgICAgICAgPE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2Ugb25TZWxlY3RDaG9pY2U9e3RoaXMuaGFuZGxlU2VsZWN0Q2hvaWNlfSBjaG9pY2U9e2Nob2ljZX0+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gIFx0XHRcdDx1bD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5xdWVzdGlvbi5jaG9pY2VzLm1hcCh0aGlzLnJlbmRlckNob2ljZSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb247XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0Q2hvaWNlKHRoaXMucHJvcHMuY2hvaWNlKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICA8aW1nIHNyYz17dGhpcy5wcm9wcy5jaG9pY2UuaW1hZ2V9IC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNob2ljZS50aXRsZX1cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIE51bWJlclF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24odGhpcy5zdGF0ZS52YWx1ZSk7XG4gIH0sXG5cbiAgaGFuZGxlVmFsdWVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwibnVtYmVyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlVmFsdWVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXJRdWVzdGlvbjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBQcm9ncmVzc0JhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8c3Bhbj57dGhpcy5wcm9wcy5jdXJyZW50UXVlc3Rpb24rMX0gLyB7dGhpcy5wcm9wcy50b3RhbFF1ZXN0aW9uc308L3NwYW4+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc0JhcjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzJyk7XG52YXIgTnVtYmVyUXVlc3Rpb24gPSByZXF1aXJlKCcuL051bWJlclF1ZXN0aW9uLmpzJyk7XG52YXIgSGVpZ2h0UXVlc3Rpb24gPSByZXF1aXJlKCcuL0hlaWdodFF1ZXN0aW9uLmpzJyk7XG5cblxudmFyIFF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMucXVlc3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBcIm11bHRpcGxlX2Nob2ljZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXt0aGlzLnByb3BzLnF1ZXN0aW9ufT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE51bWJlclF1ZXN0aW9uIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXt0aGlzLnByb3BzLnF1ZXN0aW9ufT48L051bWJlclF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImhlaWdodFwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxIZWlnaHRRdWVzdGlvbiB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gb25BbnN3ZXJRdWVzdGlvbj17dGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17dGhpcy5wcm9wcy5xdWVzdGlvbn0+PC9IZWlnaHRRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvblwiIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXt0aGlzLnByb3BzLnF1ZXN0aW9ufT57cXVlc3Rpb24udGl0bGV9PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vUHJvZ3Jlc3NCYXIuanMnKTtcblxudmFyIFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9RdWVzdGlvbi5qcycpO1xuXG5cblxuXG52YXIgUXVlc3Rpb25uYWlyZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XG4gIH0sXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBxdWVzdGlvbnM6IFN0b3JlLmdldFF1ZXN0aW9ucygpLFxuICAgICAgYW5zd2VyczogU3RvcmUuZ2V0QW5zd2VycygpLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBTdG9yZS5nZXRDdXJyZW50UXVlc3Rpb24oKVxuICAgIH0pO1xuICB9LFxuXG5cbiAgLy8gYWRkTWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICB2YXIgaW5wdXQgPSB0aGlzLnJlZnMubmV3TWVzc2FnZS5nZXRET01Ob2RlKCk7XG4gIC8vICAgYWN0aW9ucy5hZGRNZXNzYWdlKGlucHV0LnZhbHVlKTtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6ICcnXG4gIC8vICAgfSk7XG4gIC8vIH0sXG4gIC8vIHVwZGF0ZU5ld01lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gIC8vICAgfSk7XG4gIC8vIH0sXG5cblxuICBoYW5kbGVBbnN3ZXJRdWVzdGlvbjogZnVuY3Rpb24oYW5zd2VyKSB7XG4gICAgYWN0aW9ucy5hbnN3ZXJRdWVzdGlvbihhbnN3ZXIpO1xuICAgIGFjdGlvbnMubmV4dFF1ZXN0aW9uKCk7XG4gIH0sXG5cbiAgcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbiwgaW5kZXgpIHtcbiAgICBpZihpbmRleCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UXVlc3Rpb24pIHJldHVybjtcbiAgICByZXR1cm4gKFxuICAgICAgPFF1ZXN0aW9uIGtleT17aW5kZXh9IHZhbHVlPXt0aGlzLnN0YXRlLmFuc3dlcnNbaW5kZXhdfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvUXVlc3Rpb24+XG4gICAgKTtcbiAgfSxcblxuICBoYW5kbGVDbGlja0JhY2tCdXR0b246IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uKCk7XG4gIH0sXG5cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UHJvZ3Jlc3NCYXIgY3VycmVudFF1ZXN0aW9uPXt0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbn0gdG90YWxRdWVzdGlvbnM9e3RoaXMuc3RhdGUucXVlc3Rpb25zLmxlbmd0aH0+PC9Qcm9ncmVzc0Jhcj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uc1wiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnF1ZXN0aW9ucy5tYXAodGhpcy5yZW5kZXJRdWVzdGlvbil9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3tjb2xvcjogJ2dyYXknfX0+XG4gICAgICAgICAgPHNtYWxsPkFuc3dlcnM6IHtKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmFuc3dlcnMpfTwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJhY2tCdXR0b25cIiBocmVmIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2tCYWNrQnV0dG9ufT5iYWNrPC9hPlxuXG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9ubmFpcmU7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgcXVlc3Rpb25zID0gcmVxdWlyZSgnLi9xdWVzdGlvbnMuanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICBhbnN3ZXJzOiBbXSxcbiAgY3VycmVudFF1ZXN0aW9uOiAwLFxuICBxdWVzdGlvbnM6IHF1ZXN0aW9ucyxcbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5yZXNldCxcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5uZXh0UXVlc3Rpb25cbiAgXSxcbiAgYW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ0Fuc3dlcmluZyBxdWVzdGlvbiAjJyt0aGlzLmN1cnJlbnRRdWVzdGlvbisnOiAnK3ZhbHVlKTtcbiAgICB0aGlzLmFuc3dlcnNbdGhpcy5jdXJyZW50UXVlc3Rpb25dID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IDA7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHByZXZpb3VzUXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uIDw9IDApIHJldHVybiAwO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uIC09IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPj0gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xKSByZXR1cm4gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uICs9IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRBbnN3ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnN3ZXJzO1xuICAgIH0sXG4gICAgZ2V0UXVlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnM7XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UXVlc3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRRdWVzdGlvbjtcbiAgICB9LFxuICB9XG59KTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhbnN3ZXJRdWVzdGlvbicsXG4gICdyZXNldCcsXG4gICdwcmV2aW91c1F1ZXN0aW9uJyxcbiAgJ25leHRRdWVzdGlvbidcbl0pOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUXVlc3Rpb25uYWlyZSA9IHJlcXVpcmUoJy4vUXVlc3Rpb25uYWlyZS5qcycpO1xuUmVhY3QucmVuZGVyKDxRdWVzdGlvbm5haXJlLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVzdGlvbm5haXJlJykpO1xuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBHZW5kZXJcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJNYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcIm1hbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkZlbWFsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJmZW1hbGVcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIE1haW4gR29hbFwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIkJ1aWxkIE11c2NsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJidWlsZF9tdXNjbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkxvc2UgRmF0XCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImxvc2VfZmF0XCJ9LFxuICAgICAge1widGl0bGVcIjogXCJUcmFuc2Zvcm1cIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwidHJhbnNmb3JtXCJ9XG4gICAgXVxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkhvdyBtdWNoIGZhdCBkbyB5b3Ugd2FudCB0byBsb3NlP1wiLFxuICAgIFwidHlwZVwiOiBcInNsaWRlclwiLFxuICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICBcIm1pblwiOiAwLFxuICAgICAgXCJtYXhcIjogNCxcbiAgICAgIFwibWluX2xhYmVsXCI6IFwiQSBMaXR0bGVcIixcbiAgICAgIFwibWF4X2xhYmVsXCI6IFwiQSBMb3RcIlxuICAgIH1cbiAgfVxuXSJdfQ==
