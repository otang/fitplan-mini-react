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
    if (!this.state.value) return;
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
var SliderQuestion = require('./HeightQuestion.js');

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
      case "slider":
        return React.createElement(SliderQuestion, this.props);
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
    "title": "How much fat do you want to lose?",
    "type": "slider",
    "options": {
      "min": 0,
      "max": 4,
      "min_label": "A Little",
      "max_label": "A Lot"
    }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0hlaWdodFF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9OdW1iZXJRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUHJvZ3Jlc3NCYXIuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9RdWVzdGlvbm5haXJlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9TdG9yZS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvYWN0aW9ucy5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvbWFpbi5qcyIsImFwcC9xdWVzdGlvbnMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBR3RDLElBQUksY0FBYyxHQUFH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Q0FBQyxDQUNsQyxnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLGtCQUFrQixFQUNsQixjQUFjLENBQ2YsQ0FBQyxDQUFDOzs7OztBQ1BILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLGFBQWEsT0FBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7O0FDRnpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIEhlaWdodFF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICBmZWV0OiBudWxsLFxuICAgICAgaW5jaGVzOiBudWxsXG4gICAgfVxuXG4gICAgLy8gaWUuIDYnMTBcIlxuICAgIGlmKHN0YXRlLmhlaWdodCAmJiB0eXBlb2Ygc3RhdGUuaGVpZ2h0ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc29sZS5sb2coJ0hlaWdodCB2YWx1ZSBpcyAnK3N0YXRlLmhlaWdodCk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IHN0YXRlLmhlaWdodC5tYXRjaCgvKFxcZCspL2cpO1xuICAgICAgaWYobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIHN0YXRlLmZlZXQgPSBtYXRjaGVzWzBdO1xuICAgICAgICBzdGF0ZS5pbmNoZXMgPSBtYXRjaGVzWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoICF0aGlzLnN0YXRlLmZlZXQgfHwgIXRoaXMuc3RhdGUuaW5jaGVzKSByZXR1cm47XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuc3RhdGUuZmVldCtcIicgXCIrdGhpcy5zdGF0ZS5pbmNoZXMrJ1wiJztcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24oaGVpZ2h0KTtcbiAgfSxcblxuICBoYW5kbGVGZWV0Q2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZmVldDogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcbiAgaGFuZGxlSW5jaGVzQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aW5jaGVzOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJmZWV0XCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmVldENoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuZmVldH0gLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cImluY2hlc1wiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUluY2hlc0NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuaW5jaGVzfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBIZWlnaHRRdWVzdGlvbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZS5qcycpO1xuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0ge3NlbGVjdGVkQ2hvaWNlOiBudWxsfVxuICAgICAgLCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5wcm9wcy5xdWVzdGlvbi5jaG9pY2VzLmZvckVhY2goZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICBpZihfdGhpcy5wcm9wcy52YWx1ZSA9PT0gY2hvaWNlLnZhbHVlKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdGVkQ2hvaWNlID0gY2hvaWNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcbiAgaGFuZGxlU2VsZWN0Q2hvaWNlOiBmdW5jdGlvbihzZWxlY3RlZENob2ljZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkQ2hvaWNlOiBzZWxlY3RlZENob2ljZX0pO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbihzZWxlY3RlZENob2ljZS52YWx1ZSk7XG4gIH0sXG4gIF9pc1NlbGVjdGVkOiBmdW5jdGlvbihjaG9pY2UpIHtcbiAgICBpZiggIXRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UpIHJldHVybiBmYWxzZTtcbiAgICBpZihjaG9pY2UudmFsdWUgPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRDaG9pY2UudmFsdWUpIHJldHVybiB0cnVlO1xuICB9LFxuICByZW5kZXJDaG9pY2U6IGZ1bmN0aW9uKGNob2ljZSwgaW5kZXgpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5faXNTZWxlY3RlZChjaG9pY2UpID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGtleT17aW5kZXh9PlxuICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSBvblNlbGVjdENob2ljZT17dGhpcy5oYW5kbGVTZWxlY3RDaG9pY2V9IGNob2ljZT17Y2hvaWNlfT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvblwiPlxuICAgICAgICA8aDM+e3RoaXMucHJvcHMucXVlc3Rpb24udGl0bGV9PC9oMz5cbiAgXHRcdFx0PHVsPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnF1ZXN0aW9uLmNob2ljZXMubWFwKHRoaXMucmVuZGVyQ2hvaWNlKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RDaG9pY2UodGhpcy5wcm9wcy5jaG9pY2UpO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgIDxpbWcgc3JjPXt0aGlzLnByb3BzLmNob2ljZS5pbWFnZX0gLz5cbiAgICAgICAge3RoaXMucHJvcHMuY2hvaWNlLnRpdGxlfVxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgTnVtYmVyUXVlc3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCAhdGhpcy5zdGF0ZS52YWx1ZSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbih0aGlzLnN0YXRlLnZhbHVlKTtcbiAgfSxcblxuICBoYW5kbGVWYWx1ZUNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJudW1iZXJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVWYWx1ZUNoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlclF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIFByb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmN1cnJlbnRRdWVzdGlvbisxfSAvIHt0aGlzLnByb3BzLnRvdGFsUXVlc3Rpb25zfTwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gPSByZXF1aXJlKCcuL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMnKTtcbnZhciBOdW1iZXJRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTnVtYmVyUXVlc3Rpb24uanMnKTtcbnZhciBIZWlnaHRRdWVzdGlvbiA9IHJlcXVpcmUoJy4vSGVpZ2h0UXVlc3Rpb24uanMnKTtcbnZhciBTbGlkZXJRdWVzdGlvbiA9IHJlcXVpcmUoJy4vSGVpZ2h0UXVlc3Rpb24uanMnKTtcblxuXG52YXIgUXVlc3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2godGhpcy5wcm9wcy5xdWVzdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIFwibXVsdGlwbGVfY2hvaWNlXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gey4uLnRoaXMucHJvcHN9PjwvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TnVtYmVyUXVlc3Rpb24gey4uLnRoaXMucHJvcHN9PjwvTnVtYmVyUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaGVpZ2h0XCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEhlaWdodFF1ZXN0aW9uIHsuLi50aGlzLnByb3BzfT48L0hlaWdodFF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNsaWRlclwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxTbGlkZXJRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9TbGlkZXJRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHA+RXJyb3I6IHVua25vd24gcXVlc3Rpb24gdHlwZTwvcD5cbiAgICAgICAgKTtcbiAgICB9XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb247XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgnLi9Qcm9ncmVzc0Jhci5qcycpO1xuXG52YXIgUXVlc3Rpb24gPSByZXF1aXJlKCcuL1F1ZXN0aW9uLmpzJyk7XG5cblxuXG5cbnZhciBRdWVzdGlvbm5haXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfSk7XG4gIH0sXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcblxuXG4gIGhhbmRsZUFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uKGFuc3dlcik7XG4gICAgYWN0aW9ucy5uZXh0UXVlc3Rpb24oKTtcbiAgfSxcblxuICByZW5kZXJRdWVzdGlvbjogZnVuY3Rpb24gKHF1ZXN0aW9uLCBpbmRleCkge1xuICAgIGlmKGluZGV4ICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbikgcmV0dXJuO1xuICAgIHJldHVybiAoXG4gICAgICA8UXVlc3Rpb24ga2V5PXtpbmRleH0gdmFsdWU9e3RoaXMuc3RhdGUuYW5zd2Vyc1tpbmRleF19IG9uQW5zd2VyUXVlc3Rpb249e3RoaXMuaGFuZGxlQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9RdWVzdGlvbj5cbiAgICApO1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrQmFja0J1dHRvbjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24oKTtcbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9ncmVzc0JhciBjdXJyZW50UXVlc3Rpb249e3RoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9ufSB0b3RhbFF1ZXN0aW9ucz17dGhpcy5zdGF0ZS5xdWVzdGlvbnMubGVuZ3RofT48L1Byb2dyZXNzQmFyPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25zXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUucXVlc3Rpb25zLm1hcCh0aGlzLnJlbmRlclF1ZXN0aW9uKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnZ3JheSd9fT5cbiAgICAgICAgICA8c21hbGw+QW5zd2Vyczoge0pTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuYW5zd2Vycyl9PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYmFja0J1dHRvblwiIGhyZWYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JhY2tCdXR0b259PmJhY2s8L2E+XG5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb25uYWlyZTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcbnZhciBxdWVzdGlvbnMgPSByZXF1aXJlKCcuL3F1ZXN0aW9ucy5qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gIGFuc3dlcnM6IFtdLFxuICBjdXJyZW50UXVlc3Rpb246IDAsXG4gIHF1ZXN0aW9uczogcXVlc3Rpb25zLFxuICBhY3Rpb25zOiBbXG4gICAgYWN0aW9ucy5hbnN3ZXJRdWVzdGlvbixcbiAgICBhY3Rpb25zLnJlc2V0LFxuICAgIGFjdGlvbnMucHJldmlvdXNRdWVzdGlvbixcbiAgICBhY3Rpb25zLm5leHRRdWVzdGlvblxuICBdLFxuICBhbnN3ZXJRdWVzdGlvbjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnQW5zd2VyaW5nIHF1ZXN0aW9uICMnK3RoaXMuY3VycmVudFF1ZXN0aW9uKyc6ICcrdmFsdWUpO1xuICAgIHRoaXMuYW5zd2Vyc1t0aGlzLmN1cnJlbnRRdWVzdGlvbl0gPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYW5zd2VycyA9IFtdO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uID0gMDtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgcHJldmlvdXNRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPD0gMCkgcmV0dXJuIDA7XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gLT0gMTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA+PSB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLTEpIHJldHVybiB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLTE7XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gKz0gMTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfSxcbiAgZXhwb3J0czoge1xuICAgIGdldEFuc3dlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFuc3dlcnM7XG4gICAgfSxcbiAgICBnZXRRdWVzdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ucztcbiAgICB9LFxuICAgIGdldEN1cnJlbnRRdWVzdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFF1ZXN0aW9uO1xuICAgIH0sXG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ2Fuc3dlclF1ZXN0aW9uJyxcbiAgJ3Jlc2V0JyxcbiAgJ3ByZXZpb3VzUXVlc3Rpb24nLFxuICAnbmV4dFF1ZXN0aW9uJ1xuXSk7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBRdWVzdGlvbm5haXJlID0gcmVxdWlyZSgnLi9RdWVzdGlvbm5haXJlLmpzJyk7XG5SZWFjdC5yZW5kZXIoPFF1ZXN0aW9ubmFpcmUvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXN0aW9ubmFpcmUnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiSG93IG11Y2ggZmF0IGRvIHlvdSB3YW50IHRvIGxvc2U/XCIsXG4gICAgXCJ0eXBlXCI6IFwic2xpZGVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwibWluXCI6IDAsXG4gICAgICBcIm1heFwiOiA0LFxuICAgICAgXCJtaW5fbGFiZWxcIjogXCJBIExpdHRsZVwiLFxuICAgICAgXCJtYXhfbGFiZWxcIjogXCJBIExvdFwiXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIEdlbmRlclwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIk1hbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwibWFsZVwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiRmVtYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImZlbWFsZVwifVxuICAgIF1cbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJXaGF0IGlzIFlvdXIgQWdlP1wiLFxuICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEhlaWdodD9cIixcbiAgICBcInR5cGVcIjogXCJoZWlnaHRcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIE1haW4gR29hbFwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIkJ1aWxkIE11c2NsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJidWlsZF9tdXNjbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkxvc2UgRmF0XCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImxvc2VfZmF0XCJ9LFxuICAgICAge1widGl0bGVcIjogXCJUcmFuc2Zvcm1cIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwidHJhbnNmb3JtXCJ9XG4gICAgXVxuICB9XG5dIl19
