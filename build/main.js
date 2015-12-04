(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var Questionnaire = require('./Questionnaire.js');
var ThankYou = require('./ThankYou.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      page: "questionnaire"
    };
  },

  handleSurveyComplete: function handleSurveyComplete() {

    console.log('thanks for completing the survey!');
    console.log(Store.getAnswers());
    this.setState({ page: 'thank_you' });
  },

  render: function render() {
    switch (this.state.page) {
      case "questionnaire":
        return React.createElement(Questionnaire, { onComplete: this.handleSurveyComplete });
        break;
      default:
        return React.createElement(ThankYou, null);
    }
  }

});

module.exports = App;

},{"./Questionnaire.js":"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./ThankYou.js":"/Users/MacBook/www/fitplan-mini-project/app/ThankYou.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js":[function(require,module,exports){
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
    if (!this.state.feet || !this.state.inches) return;
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

},{"./MultipleChoiceQuestionChoice.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestionChoice.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestionChoice.js":[function(require,module,exports){
'use strict';

var React = require('react');

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

},{"react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js":[function(require,module,exports){
"use strict";

var React = require('react');

var NumberQuestion = React.createClass({
  displayName: "NumberQuestion",

  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    if (!this.state.value) return;
    this.props.onAnswerQuestion(this.state.value);
  },

  handleValueChange: function handleValueChange(e) {
    this.setState({ value: e.target.value });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "question" },
      React.createElement(
        "h3",
        null,
        this.props.question.title
      ),
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement("input", { name: "number", onChange: this.handleValueChange, value: this.state.value }),
        React.createElement("input", { type: "submit", value: "Next" })
      )
    );
  }
});

module.exports = NumberQuestion;

},{"react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js":[function(require,module,exports){
'use strict';

var React = require('react');

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

},{"react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Question.js":[function(require,module,exports){
'use strict';

var React = require('react');

var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');
var HeightQuestion = require('./HeightQuestion.js');

var Question = React.createClass({
  displayName: 'Question',

  render: function render() {
    switch (this.props.question.type) {
      case "multiple_choice":
        return React.createElement(MultipleChoiceQuestion, this.props);
        break;
      case "number":
        return React.createElement(NumberQuestion, this.props);
        break;
      case "height":
        return React.createElement(HeightQuestion, this.props);
        break;
      default:
        return React.createElement(
          'p',
          null,
          'Error: unknown question type'
        );
    }
  }
});

module.exports = Question;

},{"./HeightQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js","./MultipleChoiceQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js","./NumberQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js":[function(require,module,exports){
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

    if (this.state.currentQuestion >= this.state.questions.length - 1) {
      // Questionnaire is complete
      this.props.onComplete();
    } else {
      actions.nextQuestion();
    }
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
  // page: 'questionnaire',

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
// getPage: function() {
//   return this.page;
// },
// setPage: function(page) {
//   this.page = page;
//   this.emitChange();
// }

},{"./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","./questions.json":"/Users/MacBook/www/fitplan-mini-project/app/questions.json","flux-react":"flux-react"}],"/Users/MacBook/www/fitplan-mini-project/app/ThankYou.js":[function(require,module,exports){
'use strict';

var React = require('react');

var ThankYou = React.createClass({
  displayName: 'ThankYou',

  render: function render() {
    return React.createElement(
      'h1',
      null,
      'Survey complete!'
    );
  }
});

module.exports = ThankYou;

},{"react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['answerQuestion', 'reset', 'previousQuestion', 'nextQuestion']);

},{"flux-react":"flux-react"}],"/Users/MacBook/www/fitplan-mini-project/app/main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');
React.render(React.createElement(App, null), document.getElementById('app'));

},{"./App.js":"/Users/MacBook/www/fitplan-mini-project/app/App.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/questions.json":[function(require,module,exports){
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
  }
]
},{}]},{},["/Users/MacBook/www/fitplan-mini-project/app/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0FwcC5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvSGVpZ2h0UXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL051bWJlclF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9Qcm9ncmVzc0Jhci5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9ubmFpcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1N0b3JlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9UaGFua1lvdS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvYWN0aW9ucy5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvbWFpbi5qcyIsImFwcC9xdWVzdGlvbnMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FB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Y0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztBQ0ZyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIFF1ZXN0aW9ubmFpcmUgPSByZXF1aXJlKCcuL1F1ZXN0aW9ubmFpcmUuanMnKTtcbnZhciBUaGFua1lvdSA9IHJlcXVpcmUoJy4vVGhhbmtZb3UuanMnKTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBcInF1ZXN0aW9ubmFpcmVcIlxuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlU3VydmV5Q29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc29sZS5sb2coJ3RoYW5rcyBmb3IgY29tcGxldGluZyB0aGUgc3VydmV5IScpO1xuICAgIGNvbnNvbGUubG9nKFN0b3JlLmdldEFuc3dlcnMoKSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogJ3RoYW5rX3lvdSd9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCh0aGlzLnN0YXRlLnBhZ2UpIHtcbiAgICAgIGNhc2UgXCJxdWVzdGlvbm5haXJlXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFF1ZXN0aW9ubmFpcmUgb25Db21wbGV0ZT17dGhpcy5oYW5kbGVTdXJ2ZXlDb21wbGV0ZX0+PC9RdWVzdGlvbm5haXJlPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFRoYW5rWW91PjwvVGhhbmtZb3U+XG4gICAgICAgICk7XG4gICAgfVxuXHR9XG5cbn0pO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBIZWlnaHRRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgZmVldDogbnVsbCxcbiAgICAgIGluY2hlczogbnVsbFxuICAgIH1cblxuICAgIC8vIGllLiA2JzEwXCJcbiAgICBpZihzdGF0ZS5oZWlnaHQgJiYgdHlwZW9mIHN0YXRlLmhlaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdIZWlnaHQgdmFsdWUgaXMgJytzdGF0ZS5oZWlnaHQpO1xuICAgICAgdmFyIG1hdGNoZXMgPSBzdGF0ZS5oZWlnaHQubWF0Y2goLyhcXGQrKS9nKTtcbiAgICAgIGlmKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICBzdGF0ZS5mZWV0ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgc3RhdGUuaW5jaGVzID0gbWF0Y2hlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCAhdGhpcy5zdGF0ZS5mZWV0IHx8ICF0aGlzLnN0YXRlLmluY2hlcykgcmV0dXJuO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLnN0YXRlLmZlZXQrXCInIFwiK3RoaXMuc3RhdGUuaW5jaGVzKydcIic7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKGhlaWdodCk7XG4gIH0sXG5cbiAgaGFuZGxlRmVldENoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2ZlZXQ6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIGhhbmRsZUluY2hlc0NoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2luY2hlczogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwiZmVldFwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZlZXRDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmZlZXR9IC8+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJpbmNoZXNcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbmNoZXNDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmluY2hlc30gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVpZ2h0UXVlc3Rpb247XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZS5qcycpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge3NlbGVjdGVkQ2hvaWNlOiBudWxsfVxuICAgICAgLCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5wcm9wcy5xdWVzdGlvbi5jaG9pY2VzLmZvckVhY2goZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICBpZihfdGhpcy5wcm9wcy52YWx1ZSA9PT0gY2hvaWNlLnZhbHVlKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdGVkQ2hvaWNlID0gY2hvaWNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcbiAgaGFuZGxlU2VsZWN0Q2hvaWNlOiBmdW5jdGlvbihzZWxlY3RlZENob2ljZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkQ2hvaWNlOiBzZWxlY3RlZENob2ljZX0pO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbihzZWxlY3RlZENob2ljZS52YWx1ZSk7XG4gIH0sXG4gIF9pc1NlbGVjdGVkOiBmdW5jdGlvbihjaG9pY2UpIHtcbiAgICBpZiggIXRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UpIHJldHVybiBmYWxzZTtcbiAgICBpZihjaG9pY2UudmFsdWUgPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UudmFsdWUpIHJldHVybiB0cnVlO1xuICB9LFxuICByZW5kZXJDaG9pY2U6IGZ1bmN0aW9uKGNob2ljZSwgaW5kZXgpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5faXNTZWxlY3RlZChjaG9pY2UpID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGtleT17aW5kZXh9PlxuICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSBvblNlbGVjdENob2ljZT17dGhpcy5oYW5kbGVTZWxlY3RDaG9pY2V9IGNob2ljZT17Y2hvaWNlfT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvblwiPlxuICAgICAgICA8aDM+e3RoaXMucHJvcHMucXVlc3Rpb24udGl0bGV9PC9oMz5cbiAgXHRcdFx0PHVsPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnF1ZXN0aW9uLmNob2ljZXMubWFwKHRoaXMucmVuZGVyQ2hvaWNlKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdENob2ljZSh0aGlzLnByb3BzLmNob2ljZSk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgPGltZyBzcmM9e3RoaXMucHJvcHMuY2hvaWNlLmltYWdlfSAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaG9pY2UudGl0bGV9XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIE51bWJlclF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggIXRoaXMuc3RhdGUudmFsdWUpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24odGhpcy5zdGF0ZS52YWx1ZSk7XG4gIH0sXG5cbiAgaGFuZGxlVmFsdWVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwibnVtYmVyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlVmFsdWVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXJRdWVzdGlvbjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIFByb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmN1cnJlbnRRdWVzdGlvbisxfSAvIHt0aGlzLnByb3BzLnRvdGFsUXVlc3Rpb25zfTwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcycpO1xudmFyIE51bWJlclF1ZXN0aW9uID0gcmVxdWlyZSgnLi9OdW1iZXJRdWVzdGlvbi5qcycpO1xudmFyIEhlaWdodFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9IZWlnaHRRdWVzdGlvbi5qcycpO1xuXG5cbnZhciBRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLnF1ZXN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJtdWx0aXBsZV9jaG9pY2VcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxOdW1iZXJRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9OdW1iZXJRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJoZWlnaHRcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8SGVpZ2h0UXVlc3Rpb24gey4uLnRoaXMucHJvcHN9PjwvSGVpZ2h0UXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxwPkVycm9yOiB1bmtub3duIHF1ZXN0aW9uIHR5cGU8L3A+XG4gICAgICAgICk7XG4gICAgfVxuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vUHJvZ3Jlc3NCYXIuanMnKTtcbnZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vUXVlc3Rpb24uanMnKTtcblxuXG5cbnZhciBRdWVzdGlvbm5haXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfSk7XG4gIH0sXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG4gIGhhbmRsZUFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uKGFuc3dlcik7XG5cbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbiA+PSB0aGlzLnN0YXRlLnF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBRdWVzdGlvbm5haXJlIGlzIGNvbXBsZXRlXG4gICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5uZXh0UXVlc3Rpb24oKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbiwgaW5kZXgpIHtcbiAgICBpZihpbmRleCAhPT0gdGhpcy5zdGF0ZS5jdXJyZW50UXVlc3Rpb24pIHJldHVybjtcbiAgICByZXR1cm4gKFxuICAgICAgPFF1ZXN0aW9uIGtleT17aW5kZXh9IHZhbHVlPXt0aGlzLnN0YXRlLmFuc3dlcnNbaW5kZXhdfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvUXVlc3Rpb24+XG4gICAgKTtcbiAgfSxcblxuICBoYW5kbGVDbGlja0JhY2tCdXR0b246IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uKCk7XG4gIH0sXG5cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UHJvZ3Jlc3NCYXIgY3VycmVudFF1ZXN0aW9uPXt0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbn0gdG90YWxRdWVzdGlvbnM9e3RoaXMuc3RhdGUucXVlc3Rpb25zLmxlbmd0aH0+PC9Qcm9ncmVzc0Jhcj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uc1wiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnF1ZXN0aW9ucy5tYXAodGhpcy5yZW5kZXJRdWVzdGlvbil9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3tjb2xvcjogJ2dyYXknfX0+XG4gICAgICAgICAgPHNtYWxsPkFuc3dlcnM6IHtKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmFuc3dlcnMpfTwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJhY2tCdXR0b25cIiBocmVmIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2tCYWNrQnV0dG9ufT5iYWNrPC9hPlxuXG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9ubmFpcmU7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgcXVlc3Rpb25zID0gcmVxdWlyZSgnLi9xdWVzdGlvbnMuanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICBhbnN3ZXJzOiBbXSxcbiAgY3VycmVudFF1ZXN0aW9uOiAwLFxuICBxdWVzdGlvbnM6IHF1ZXN0aW9ucyxcbiAgLy8gcGFnZTogJ3F1ZXN0aW9ubmFpcmUnLFxuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uLFxuICAgIGFjdGlvbnMucmVzZXQsXG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uLFxuICAgIGFjdGlvbnMubmV4dFF1ZXN0aW9uXG4gIF0sXG4gIGFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdBbnN3ZXJpbmcgcXVlc3Rpb24gIycrdGhpcy5jdXJyZW50UXVlc3Rpb24rJzogJyt2YWx1ZSk7XG4gICAgdGhpcy5hbnN3ZXJzW3RoaXMuY3VycmVudFF1ZXN0aW9uXSA9IHZhbHVlO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hbnN3ZXJzID0gW107XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSAwO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBwcmV2aW91c1F1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA8PSAwKSByZXR1cm4gMDtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiAtPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uID49IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMSkgcmV0dXJuIHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiArPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBleHBvcnRzOiB7XG4gICAgZ2V0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYW5zd2VycztcbiAgICB9LFxuICAgIGdldFF1ZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFF1ZXN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50UXVlc3Rpb247XG4gICAgfSxcbiAgICAvLyBnZXRQYWdlOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgIHJldHVybiB0aGlzLnBhZ2U7XG4gICAgLy8gfSxcbiAgICAvLyBzZXRQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgLy8gfVxuICB9XG59KTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgVGhhbmtZb3UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGgxPlN1cnZleSBjb21wbGV0ZSE8L2gxPlxuICAgICk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVGhhbmtZb3U7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnYW5zd2VyUXVlc3Rpb24nLFxuICAncmVzZXQnLFxuICAncHJldmlvdXNRdWVzdGlvbicsXG4gICduZXh0UXVlc3Rpb24nXG5dKTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XG5SZWFjdC5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIEdlbmRlclwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIk1hbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwibWFsZVwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiRmVtYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImZlbWFsZVwifVxuICAgIF1cbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJXaGF0IGlzIFlvdXIgQWdlP1wiLFxuICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEhlaWdodD9cIixcbiAgICBcInR5cGVcIjogXCJoZWlnaHRcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIE1haW4gR29hbFwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIkJ1aWxkIE11c2NsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJidWlsZF9tdXNjbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkxvc2UgRmF0XCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImxvc2VfZmF0XCJ9LFxuICAgICAge1widGl0bGVcIjogXCJUcmFuc2Zvcm1cIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwidHJhbnNmb3JtXCJ9XG4gICAgXVxuICB9XG5dIl19
