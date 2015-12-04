(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var Questionnaire = require('./Questionnaire.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      page: Store.getPage()
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
      page: Store.getPage()
    });
  },

  render: function render() {
    switch (Store.getPage()) {
      case "questionnaire":
        return React.createElement(Questionnaire, null);
        break;
      default:
        return React.createElement(
          'h1',
          null,
          'Thnkx'
        );
    }
  }

});

module.exports = App;

},{"./Questionnaire.js":"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js":[function(require,module,exports){
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
      // this.props.onComplete(this.state.answers);
      Store.setPage('tanks');
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
  page: 'questionnaire',

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
    },
    getPage: function getPage() {
      return this.page;
    },
    setPage: function setPage(page) {
      this.page = page;
      this.emitChange();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0FwcC5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvSGVpZ2h0UXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL051bWJlclF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9Qcm9ncmVzc0Jhci5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUXVlc3Rpb24uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9ubmFpcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1N0b3JlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9hY3Rpb25zLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9tYWluLmpzIiwiYXBwL3F1ZXN0aW9ucy5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIFF1ZXN0aW9ubmFpcmUgPSByZXF1aXJlKCcuL1F1ZXN0aW9ubmFpcmUuanMnKTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBTdG9yZS5nZXRQYWdlKClcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2U6IFN0b3JlLmdldFBhZ2UoKVxuICAgIH0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoKFN0b3JlLmdldFBhZ2UoKSkge1xuICAgICAgY2FzZSBcInF1ZXN0aW9ubmFpcmVcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8UXVlc3Rpb25uYWlyZT48L1F1ZXN0aW9ubmFpcmU+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8aDE+VGhua3g8L2gxPlxuICAgICAgICApO1xuICAgIH1cblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBIZWlnaHRRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgZmVldDogbnVsbCxcbiAgICAgIGluY2hlczogbnVsbFxuICAgIH1cblxuICAgIC8vIGllLiA2JzEwXCJcbiAgICBpZihzdGF0ZS5oZWlnaHQgJiYgdHlwZW9mIHN0YXRlLmhlaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdIZWlnaHQgdmFsdWUgaXMgJytzdGF0ZS5oZWlnaHQpO1xuICAgICAgdmFyIG1hdGNoZXMgPSBzdGF0ZS5oZWlnaHQubWF0Y2goLyhcXGQrKS9nKTtcbiAgICAgIGlmKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICBzdGF0ZS5mZWV0ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgc3RhdGUuaW5jaGVzID0gbWF0Y2hlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCAhdGhpcy5zdGF0ZS5mZWV0IHx8ICF0aGlzLnN0YXRlLmluY2hlcykgcmV0dXJuO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLnN0YXRlLmZlZXQrXCInIFwiK3RoaXMuc3RhdGUuaW5jaGVzKydcIic7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKGhlaWdodCk7XG4gIH0sXG5cbiAgaGFuZGxlRmVldENoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2ZlZXQ6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG4gIGhhbmRsZUluY2hlc0NoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2luY2hlczogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwiZmVldFwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZlZXRDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmZlZXR9IC8+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJpbmNoZXNcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbmNoZXNDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmluY2hlc30gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVpZ2h0UXVlc3Rpb247XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZS5qcycpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge3NlbGVjdGVkQ2hvaWNlOiBudWxsfVxuICAgICAgLCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5wcm9wcy5xdWVzdGlvbi5jaG9pY2VzLmZvckVhY2goZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICBpZihfdGhpcy5wcm9wcy52YWx1ZSA9PT0gY2hvaWNlLnZhbHVlKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdGVkQ2hvaWNlID0gY2hvaWNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcbiAgaGFuZGxlU2VsZWN0Q2hvaWNlOiBmdW5jdGlvbihzZWxlY3RlZENob2ljZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkQ2hvaWNlOiBzZWxlY3RlZENob2ljZX0pO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbihzZWxlY3RlZENob2ljZS52YWx1ZSk7XG4gIH0sXG4gIF9pc1NlbGVjdGVkOiBmdW5jdGlvbihjaG9pY2UpIHtcbiAgICBpZiggIXRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UpIHJldHVybiBmYWxzZTtcbiAgICBpZihjaG9pY2UudmFsdWUgPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UudmFsdWUpIHJldHVybiB0cnVlO1xuICB9LFxuICByZW5kZXJDaG9pY2U6IGZ1bmN0aW9uKGNob2ljZSwgaW5kZXgpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5faXNTZWxlY3RlZChjaG9pY2UpID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGtleT17aW5kZXh9PlxuICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSBvblNlbGVjdENob2ljZT17dGhpcy5oYW5kbGVTZWxlY3RDaG9pY2V9IGNob2ljZT17Y2hvaWNlfT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvblwiPlxuICAgICAgICA8aDM+e3RoaXMucHJvcHMucXVlc3Rpb24udGl0bGV9PC9oMz5cbiAgXHRcdFx0PHVsPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnF1ZXN0aW9uLmNob2ljZXMubWFwKHRoaXMucmVuZGVyQ2hvaWNlKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdENob2ljZSh0aGlzLnByb3BzLmNob2ljZSk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgPGltZyBzcmM9e3RoaXMucHJvcHMuY2hvaWNlLmltYWdlfSAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaG9pY2UudGl0bGV9XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIE51bWJlclF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggIXRoaXMuc3RhdGUudmFsdWUpIHJldHVybjtcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24odGhpcy5zdGF0ZS52YWx1ZSk7XG4gIH0sXG5cbiAgaGFuZGxlVmFsdWVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxpbnB1dCBuYW1lPVwibnVtYmVyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlVmFsdWVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXJRdWVzdGlvbjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIFByb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmN1cnJlbnRRdWVzdGlvbisxfSAvIHt0aGlzLnByb3BzLnRvdGFsUXVlc3Rpb25zfTwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcycpO1xudmFyIE51bWJlclF1ZXN0aW9uID0gcmVxdWlyZSgnLi9OdW1iZXJRdWVzdGlvbi5qcycpO1xudmFyIEhlaWdodFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9IZWlnaHRRdWVzdGlvbi5qcycpO1xuXG5cbnZhciBRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLnF1ZXN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJtdWx0aXBsZV9jaG9pY2VcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxOdW1iZXJRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9OdW1iZXJRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJoZWlnaHRcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8SGVpZ2h0UXVlc3Rpb24gey4uLnRoaXMucHJvcHN9PjwvSGVpZ2h0UXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxwPkVycm9yOiB1bmtub3duIHF1ZXN0aW9uIHR5cGU8L3A+XG4gICAgICAgICk7XG4gICAgfVxuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vUHJvZ3Jlc3NCYXIuanMnKTtcbnZhciBRdWVzdGlvbiA9IHJlcXVpcmUoJy4vUXVlc3Rpb24uanMnKTtcblxuXG5cbnZhciBRdWVzdGlvbm5haXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfSk7XG4gIH0sXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG4gIGhhbmRsZUFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uKGFuc3dlcik7XG5cbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbiA+PSB0aGlzLnN0YXRlLnF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAvLyB0aGlzLnByb3BzLm9uQ29tcGxldGUodGhpcy5zdGF0ZS5hbnN3ZXJzKTtcbiAgICAgIFN0b3JlLnNldFBhZ2UoJ3RhbmtzJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5uZXh0UXVlc3Rpb24oKTtcbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXJRdWVzdGlvbjogZnVuY3Rpb24gKHF1ZXN0aW9uLCBpbmRleCkge1xuICAgIGlmKGluZGV4ICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbikgcmV0dXJuO1xuICAgIHJldHVybiAoXG4gICAgICA8UXVlc3Rpb24ga2V5PXtpbmRleH0gdmFsdWU9e3RoaXMuc3RhdGUuYW5zd2Vyc1tpbmRleF19IG9uQW5zd2VyUXVlc3Rpb249e3RoaXMuaGFuZGxlQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9RdWVzdGlvbj5cbiAgICApO1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrQmFja0J1dHRvbjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24oKTtcbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9ncmVzc0JhciBjdXJyZW50UXVlc3Rpb249e3RoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9ufSB0b3RhbFF1ZXN0aW9ucz17dGhpcy5zdGF0ZS5xdWVzdGlvbnMubGVuZ3RofT48L1Byb2dyZXNzQmFyPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25zXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUucXVlc3Rpb25zLm1hcCh0aGlzLnJlbmRlclF1ZXN0aW9uKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnZ3JheSd9fT5cbiAgICAgICAgICA8c21hbGw+QW5zd2Vyczoge0pTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuYW5zd2Vycyl9PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYmFja0J1dHRvblwiIGhyZWYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JhY2tCdXR0b259PmJhY2s8L2E+XG5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb25uYWlyZTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcbnZhciBxdWVzdGlvbnMgPSByZXF1aXJlKCcuL3F1ZXN0aW9ucy5qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIGFuc3dlcnM6IFtdLFxuICBjdXJyZW50UXVlc3Rpb246IDAsXG4gIHF1ZXN0aW9uczogcXVlc3Rpb25zLFxuICBwYWdlOiAncXVlc3Rpb25uYWlyZScsXG5cbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5yZXNldCxcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5uZXh0UXVlc3Rpb25cbiAgXSxcbiAgYW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ0Fuc3dlcmluZyBxdWVzdGlvbiAjJyt0aGlzLmN1cnJlbnRRdWVzdGlvbisnOiAnK3ZhbHVlKTtcbiAgICB0aGlzLmFuc3dlcnNbdGhpcy5jdXJyZW50UXVlc3Rpb25dID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IDA7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHByZXZpb3VzUXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uIDw9IDApIHJldHVybiAwO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uIC09IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPj0gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xKSByZXR1cm4gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uICs9IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRBbnN3ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnN3ZXJzO1xuICAgIH0sXG4gICAgZ2V0UXVlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnM7XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UXVlc3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRRdWVzdGlvbjtcbiAgICB9LFxuICAgIGdldFBhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFnZTtcbiAgICB9LFxuICAgIHNldFBhZ2U6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB9XG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ2Fuc3dlclF1ZXN0aW9uJyxcbiAgJ3Jlc2V0JyxcbiAgJ3ByZXZpb3VzUXVlc3Rpb24nLFxuICAnbmV4dFF1ZXN0aW9uJ1xuXSk7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBcHAgPSByZXF1aXJlKCcuL0FwcC5qcycpO1xuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBHZW5kZXJcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJNYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcIm1hbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkZlbWFsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJmZW1hbGVcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBNYWluIEdvYWxcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJCdWlsZCBNdXNjbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwiYnVpbGRfbXVzY2xlXCJ9LFxuICAgICAge1widGl0bGVcIjogXCJMb3NlIEZhdFwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJsb3NlX2ZhdFwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiVHJhbnNmb3JtXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcInRyYW5zZm9ybVwifVxuICAgIF1cbiAgfVxuXSJdfQ==
