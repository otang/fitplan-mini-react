(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var HeightQuestion = React.createClass({
  displayName: 'HeightQuestion',

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

},{"./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = require('./ProgressBar.js');
var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');
var HeightQuestion = require('./HeightQuestion.js');

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
        return React.createElement(MultipleChoiceQuestion, { key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      case "number":
        return React.createElement(NumberQuestion, { key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      case "height":
        return React.createElement(HeightQuestion, { key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion, question: question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question', key: index, value: this.state.answers[index], onAnswerQuestion: this.handleAnswerQuestion },
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

},{"./HeightQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js","./MultipleChoiceQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/MultipleChoiceQuestion.js","./NumberQuestion.js":"/Users/MacBook/www/fitplan-mini-project/app/NumberQuestion.js","./ProgressBar.js":"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Store.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0hlaWdodFF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9OdW1iZXJRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUHJvZ3Jlc3NCYXIuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9ubmFpcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1N0b3JlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9hY3Rpb25zLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9tYWluLmpzIiwiYXBwL3F1ZXN0aW9ucy5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFHdEMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3JDLGlCQUFlLEVBQUUsMkJBQVk7QUFDM0IsV0FBTztBQUNMLFdBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7S0FDeEIsQ0FBQztHQUNIOztBQUVELGNBQVksRUFBRSxzQkFBUyxDQUFDLEVBQUU7QUFDeEIsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLFFBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMvQzs7QUFFRCxtQkFBaUIsRUFBRSwyQkFBUyxDQUFDLEVBQUU7QUFDN0IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7R0FDeEM7O0FBRUYsUUFBTSxFQUFFLGtCQUFXO0FBQ2xCLFdBQ0k7O1FBQUssU0FBUyxFQUFDLFVBQVU7TUFDdkI7OztRQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUs7T0FBTTtNQUNwQzs7VUFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQUFBQztRQUNoQywrQkFBTyxJQUFJLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsR0FBRztRQUNsRiwrQkFBTyxJQUFJLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxNQUFNLEdBQUc7T0FDL0I7S0FDSCxDQUNSO0dBQ0Y7Q0FDRCxDQUFDLENBQUM7O0FBR0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Ozs7O0FDbkNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN0QyxJQUFJLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOztBQUVoRixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUM3QyxpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFFBQUksS0FBSyxHQUFHLEVBQUMsY0FBYyxFQUFFLElBQUksRUFBQztRQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDbkQsVUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3JDLGFBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO09BQy9CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0gsV0FBTyxLQUFLLENBQUM7R0FDZDtBQUNELG9CQUFrQixFQUFFLDRCQUFTLGNBQWMsRUFBRTtBQUMzQyxRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBQyxDQUFDLENBQUM7QUFDaEQsUUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDbkQ7QUFDRCxhQUFXLEVBQUUscUJBQVMsTUFBTSxFQUFFO0FBQzVCLFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM3QyxRQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSSxDQUFDO0dBQ2xFO0FBQ0QsY0FBWSxFQUFFLHNCQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDcEMsUUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQzNELFdBQ0U7O1FBQUksU0FBUyxFQUFFLFNBQVMsQUFBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEFBQUM7TUFDbkMsb0JBQUMsNEJBQTRCLElBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBZ0M7S0FDbkgsQ0FDTDtHQUNIOztBQUVGLFFBQU0sRUFBRSxrQkFBVztBQUNsQixXQUNJOztRQUFLLFNBQVMsRUFBQyxVQUFVO01BQ3ZCOzs7UUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLO09BQU07TUFDdkM7OztRQUNNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztPQUNoRDtLQUNELENBQ1I7R0FDRjtDQUNELENBQUMsQ0FBQzs7QUFHSCxNQUFNLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDOzs7OztBQzlDeEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBR3RDLElBQUksNEJBQTRCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRW5ELGFBQVcsRUFBRSx1QkFBVztBQUN0QixRQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzlDOztBQUVGLFFBQU0sRUFBRSxrQkFBVztBQUNsQixXQUNJOztRQUFLLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO01BQzdCLDZCQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEFBQUMsR0FBRztNQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO0tBQ3BCLENBQ1I7R0FDRjs7Q0FFRCxDQUFDLENBQUM7O0FBS0gsTUFBTSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQzs7Ozs7QUN6QjlDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUd0QyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDckMsaUJBQWUsRUFBRSwyQkFBWTtBQUMzQixXQUFPO0FBQ0wsV0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztLQUN4QixDQUFDO0dBQ0g7O0FBRUQsY0FBWSxFQUFFLHNCQUFTLENBQUMsRUFBRTtBQUN4QixLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsUUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQy9DOztBQUVELG1CQUFpQixFQUFFLDJCQUFTLENBQUMsRUFBRTtBQUM3QixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztHQUN4Qzs7QUFFRixRQUFNLEVBQUUsa0JBQVc7QUFDbEIsV0FDSTs7UUFBSyxTQUFTLEVBQUMsVUFBVTtNQUN2Qjs7O1FBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSztPQUFNO01BQ3BDOztVQUFNLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDO1FBQ2hDLCtCQUFPLElBQUksRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQUFBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQyxHQUFHO1FBQ2xGLCtCQUFPLElBQUksRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE1BQU0sR0FBRztPQUMvQjtLQUNILENBQ1I7R0FDRjtDQUNELENBQUMsQ0FBQzs7QUFHSCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzs7Ozs7QUNwQ2hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUd0QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFbkMsT0FBTSxFQUFFLGtCQUFXO0FBQ2xCLFNBQ0k7OztHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFDLENBQUM7O0dBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjO0dBQVEsQ0FDM0U7RUFDRjs7Q0FFRCxDQUFDLENBQUM7O0FBS0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7Ozs7O0FDbEI3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFdEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUMsSUFBSSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNwRSxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNwRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFJcEQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3BDLGlCQUFlLEVBQUUsMkJBQVk7QUFDM0IsV0FBTztBQUNMLGVBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQy9CLGFBQU8sRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQzNCLHFCQUFlLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixFQUFFO0tBQzVDLENBQUM7R0FDSDtBQUNELG9CQUFrQixFQUFFLDhCQUFZO0FBQzlCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDM0M7QUFDRCxzQkFBb0IsRUFBRSxnQ0FBWTtBQUNoQyxTQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzlDO0FBQ0QsYUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUMvQixhQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUMzQixxQkFBZSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtLQUM1QyxDQUFDLENBQUM7R0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQW1CRCxzQkFBb0IsRUFBRSw4QkFBUyxNQUFNLEVBQUU7QUFDckMsV0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixXQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7R0FDeEI7O0FBRUQsZ0JBQWMsRUFBRSx3QkFBVSxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQ3pDLFFBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLE9BQU87QUFDaEQsWUFBTyxRQUFRLENBQUMsSUFBSTtBQUNsQixXQUFLLGlCQUFpQjtBQUNwQixlQUNFLG9CQUFDLHNCQUFzQixJQUFDLEdBQUcsRUFBRSxLQUFLLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEFBQUMsRUFBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEFBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxBQUFDLEdBQTBCLENBQ2pLO0FBQ0QsY0FBTTtBQUFBLEFBQ1IsV0FBSyxRQUFRO0FBQ1gsZUFDRSxvQkFBQyxjQUFjLElBQUMsR0FBRyxFQUFFLEtBQUssQUFBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQUFBQyxFQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQUFBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEFBQUMsR0FBa0IsQ0FDako7QUFDRCxjQUFNO0FBQUEsQUFDUixXQUFLLFFBQVE7QUFDWCxlQUNFLG9CQUFDLGNBQWMsSUFBQyxHQUFHLEVBQUUsS0FBSyxBQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxBQUFDLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixBQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsQUFBQyxHQUFrQixDQUNqSjtBQUNELGNBQU07QUFBQSxBQUNSO0FBQ0UsZUFDRTs7WUFBSyxTQUFTLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBRSxLQUFLLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEFBQUMsRUFBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEFBQUM7VUFBRSxRQUFRLENBQUMsS0FBSztTQUFPLENBQzNJO0FBQUEsS0FDTDtHQUNGOztBQUVELHVCQUFxQixFQUFFLCtCQUFTLENBQUMsRUFBRTtBQUNqQyxLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsV0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7R0FDNUI7O0FBR0YsUUFBTSxFQUFFLGtCQUFXO0FBQ2xCLFdBQ0k7OztNQUNFLG9CQUFDLFdBQVcsSUFBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEFBQUMsRUFBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxBQUFDLEdBQWU7TUFFckg7O1VBQUssU0FBUyxFQUFDLFdBQVc7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7T0FDMUM7TUFFTjs7VUFBSyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLEFBQUM7UUFDMUI7Ozs7VUFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUFTO09BQ3hEO01BRU47O1VBQUcsU0FBUyxFQUFDLFlBQVksRUFBQyxJQUFJLE1BQUEsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixBQUFDOztPQUFTO0tBRXhFLENBQ1I7R0FDRjs7Q0FFRCxDQUFDLENBQUM7O0FBS0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7Ozs7O0FDOUcvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU1QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDaEMsU0FBTyxFQUFFLEVBQUU7QUFDWCxpQkFBZSxFQUFFLENBQUM7QUFDbEIsV0FBUyxFQUFFLFNBQVM7QUFDcEIsU0FBTyxFQUFFLENBQ1AsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLEtBQUssRUFDYixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxZQUFZLENBQ3JCO0FBQ0QsZ0JBQWMsRUFBRSx3QkFBUyxLQUFLLEVBQUU7QUFDOUIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLElBQUksR0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRSxRQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDM0MsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsT0FBSyxFQUFFLGlCQUFXO0FBQ2hCLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFFBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUNuQjtBQUNELGtCQUFnQixFQUFFLDRCQUFXO0FBQzNCLFFBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkMsUUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7QUFDMUIsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsY0FBWSxFQUFFLHdCQUFXO0FBQ3ZCLFFBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRSxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRSxDQUFDLENBQUM7QUFDckYsUUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7QUFDMUIsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsU0FBTyxFQUFFO0FBQ1AsY0FBVSxFQUFFLHNCQUFZO0FBQ3RCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtBQUNELGdCQUFZLEVBQUUsd0JBQVk7QUFDeEIsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCO0FBQ0Qsc0JBQWtCLEVBQUUsOEJBQVk7QUFDOUIsYUFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDLENBQUM7Ozs7O0FDN0NILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLGdCQUFnQixFQUNoQixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGNBQWMsQ0FDZixDQUFDLENBQUM7Ozs7O0FDUEgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xELEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsYUFBYSxPQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7QUNGekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgSGVpZ2h0UXVlc3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbih0aGlzLnN0YXRlLnZhbHVlKTtcbiAgfSxcblxuICBoYW5kbGVWYWx1ZUNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJudW1iZXJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVWYWx1ZUNoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlaWdodFF1ZXN0aW9uO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlID0gcmVxdWlyZSgnLi9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzJyk7XG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7c2VsZWN0ZWRDaG9pY2U6IG51bGx9XG4gICAgICAsIF90aGlzID0gdGhpcztcbiAgICB0aGlzLnByb3BzLnF1ZXN0aW9uLmNob2ljZXMuZm9yRWFjaChmdW5jdGlvbihjaG9pY2UpIHtcbiAgICAgIGlmKF90aGlzLnByb3BzLnZhbHVlID09PSBjaG9pY2UudmFsdWUpIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWRDaG9pY2UgPSBjaG9pY2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9LFxuICBoYW5kbGVTZWxlY3RDaG9pY2U6IGZ1bmN0aW9uKHNlbGVjdGVkQ2hvaWNlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRDaG9pY2U6IHNlbGVjdGVkQ2hvaWNlfSk7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKHNlbGVjdGVkQ2hvaWNlLnZhbHVlKTtcbiAgfSxcbiAgX2lzU2VsZWN0ZWQ6IGZ1bmN0aW9uKGNob2ljZSkge1xuICAgIGlmKCAhdGhpcy5zdGF0ZS5zZWxlY3RlZENob2ljZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGNob2ljZS52YWx1ZSA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZENob2ljZS52YWx1ZSkgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHJlbmRlckNob2ljZTogZnVuY3Rpb24oY2hvaWNlLCBpbmRleCkge1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLl9pc1NlbGVjdGVkKGNob2ljZSkgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZX0ga2V5PXtpbmRleH0+XG4gICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlIG9uU2VsZWN0Q2hvaWNlPXt0aGlzLmhhbmRsZVNlbGVjdENob2ljZX0gY2hvaWNlPXtjaG9pY2V9PjwvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZT5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICBcdFx0XHQ8dWw+XG4gICAgICAgICAge3RoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlcy5tYXAodGhpcy5yZW5kZXJDaG9pY2UpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdENob2ljZSh0aGlzLnByb3BzLmNob2ljZSk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgPGltZyBzcmM9e3RoaXMucHJvcHMuY2hvaWNlLmltYWdlfSAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaG9pY2UudGl0bGV9XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlQ2hvaWNlUXVlc3Rpb25DaG9pY2U7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xuXG5cbnZhciBOdW1iZXJRdWVzdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXG4gICAgfTtcbiAgfSxcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKHRoaXMuc3RhdGUudmFsdWUpO1xuICB9LFxuXG4gIGhhbmRsZVZhbHVlQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGUudGFyZ2V0LnZhbHVlfSk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvblwiPlxuICAgICAgICA8aDM+e3RoaXMucHJvcHMucXVlc3Rpb24udGl0bGV9PC9oMz5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cIm51bWJlclwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVZhbHVlQ2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyUXVlc3Rpb247XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgUHJvZ3Jlc3NCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPHNwYW4+e3RoaXMucHJvcHMuY3VycmVudFF1ZXN0aW9uKzF9IC8ge3RoaXMucHJvcHMudG90YWxRdWVzdGlvbnN9PC9zcGFuPlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgnLi9Qcm9ncmVzc0Jhci5qcycpO1xudmFyIE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gPSByZXF1aXJlKCcuL011bHRpcGxlQ2hvaWNlUXVlc3Rpb24uanMnKTtcbnZhciBOdW1iZXJRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTnVtYmVyUXVlc3Rpb24uanMnKTtcbnZhciBIZWlnaHRRdWVzdGlvbiA9IHJlcXVpcmUoJy4vSGVpZ2h0UXVlc3Rpb24uanMnKTtcblxuXG5cbnZhciBRdWVzdGlvbm5haXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHF1ZXN0aW9uczogU3RvcmUuZ2V0UXVlc3Rpb25zKCksXG4gICAgICBhbnN3ZXJzOiBTdG9yZS5nZXRBbnN3ZXJzKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IFN0b3JlLmdldEN1cnJlbnRRdWVzdGlvbigpXG4gICAgfSk7XG4gIH0sXG5cblxuXG4gIC8vIGFkZE1lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld01lc3NhZ2UuZ2V0RE9NTm9kZSgpO1xuICAvLyAgIGFjdGlvbnMuYWRkTWVzc2FnZShpbnB1dC52YWx1ZSk7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiAnJ1xuICAvLyAgIH0pO1xuICAvLyB9LFxuICAvLyB1cGRhdGVOZXdNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAvLyAgIH0pO1xuICAvLyB9LFxuXG5cbiAgaGFuZGxlQW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKGFuc3dlcikge1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb24oYW5zd2VyKTtcbiAgICBhY3Rpb25zLm5leHRRdWVzdGlvbigpO1xuICB9LFxuXG4gIHJlbmRlclF1ZXN0aW9uOiBmdW5jdGlvbiAocXVlc3Rpb24sIGluZGV4KSB7XG4gICAgaWYoaW5kZXggIT09IHRoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9uKSByZXR1cm47XG4gICAgc3dpdGNoKHF1ZXN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJtdWx0aXBsZV9jaG9pY2VcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8TXVsdGlwbGVDaG9pY2VRdWVzdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17dGhpcy5zdGF0ZS5hbnN3ZXJzW2luZGV4XX0gb25BbnN3ZXJRdWVzdGlvbj17dGhpcy5oYW5kbGVBbnN3ZXJRdWVzdGlvbn0gcXVlc3Rpb249e3F1ZXN0aW9ufT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE51bWJlclF1ZXN0aW9uIGtleT17aW5kZXh9IHZhbHVlPXt0aGlzLnN0YXRlLmFuc3dlcnNbaW5kZXhdfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvTnVtYmVyUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaGVpZ2h0XCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEhlaWdodFF1ZXN0aW9uIGtleT17aW5kZXh9IHZhbHVlPXt0aGlzLnN0YXRlLmFuc3dlcnNbaW5kZXhdfSBvbkFuc3dlclF1ZXN0aW9uPXt0aGlzLmhhbmRsZUFuc3dlclF1ZXN0aW9ufSBxdWVzdGlvbj17cXVlc3Rpb259PjwvSGVpZ2h0UXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIiBrZXk9e2luZGV4fSB2YWx1ZT17dGhpcy5zdGF0ZS5hbnN3ZXJzW2luZGV4XX0gb25BbnN3ZXJRdWVzdGlvbj17dGhpcy5oYW5kbGVBbnN3ZXJRdWVzdGlvbn0+e3F1ZXN0aW9uLnRpdGxlfTwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgfSxcblxuICBoYW5kbGVDbGlja0JhY2tCdXR0b246IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uKCk7XG4gIH0sXG5cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UHJvZ3Jlc3NCYXIgY3VycmVudFF1ZXN0aW9uPXt0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbn0gdG90YWxRdWVzdGlvbnM9e3RoaXMuc3RhdGUucXVlc3Rpb25zLmxlbmd0aH0+PC9Qcm9ncmVzc0Jhcj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uc1wiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnF1ZXN0aW9ucy5tYXAodGhpcy5yZW5kZXJRdWVzdGlvbil9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3tjb2xvcjogJ2dyYXknfX0+XG4gICAgICAgICAgPHNtYWxsPkFuc3dlcnM6IHtKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmFuc3dlcnMpfTwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJhY2tCdXR0b25cIiBocmVmIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2tCYWNrQnV0dG9ufT5iYWNrPC9hPlxuXG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXN0aW9ubmFpcmU7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgcXVlc3Rpb25zID0gcmVxdWlyZSgnLi9xdWVzdGlvbnMuanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICBhbnN3ZXJzOiBbXSxcbiAgY3VycmVudFF1ZXN0aW9uOiAwLFxuICBxdWVzdGlvbnM6IHF1ZXN0aW9ucyxcbiAgYWN0aW9uczogW1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5yZXNldCxcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24sXG4gICAgYWN0aW9ucy5uZXh0UXVlc3Rpb25cbiAgXSxcbiAgYW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ0Fuc3dlcmluZyBxdWVzdGlvbiAjJyt0aGlzLmN1cnJlbnRRdWVzdGlvbisnOiAnK3ZhbHVlKTtcbiAgICB0aGlzLmFuc3dlcnNbdGhpcy5jdXJyZW50UXVlc3Rpb25dID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IDA7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIHByZXZpb3VzUXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uIDw9IDApIHJldHVybiAwO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uIC09IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jdXJyZW50UXVlc3Rpb24gPj0gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xKSByZXR1cm4gdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0xO1xuICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uICs9IDE7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH0sXG4gIGV4cG9ydHM6IHtcbiAgICBnZXRBbnN3ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbnN3ZXJzO1xuICAgIH0sXG4gICAgZ2V0UXVlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnM7XG4gICAgfSxcbiAgICBnZXRDdXJyZW50UXVlc3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRRdWVzdGlvbjtcbiAgICB9LFxuICB9XG59KTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhbnN3ZXJRdWVzdGlvbicsXG4gICdyZXNldCcsXG4gICdwcmV2aW91c1F1ZXN0aW9uJyxcbiAgJ25leHRRdWVzdGlvbidcbl0pOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUXVlc3Rpb25uYWlyZSA9IHJlcXVpcmUoJy4vUXVlc3Rpb25uYWlyZS5qcycpO1xuUmVhY3QucmVuZGVyKDxRdWVzdGlvbm5haXJlLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVzdGlvbm5haXJlJykpO1xuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIEdlbmRlclwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIk1hbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwibWFsZVwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiRmVtYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImZlbWFsZVwifVxuICAgIF1cbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJXaGF0IGlzIFlvdXIgQWdlP1wiLFxuICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEhlaWdodD9cIixcbiAgICBcInR5cGVcIjogXCJoZWlnaHRcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkNob29zZSBZb3VyIE1haW4gR29hbFwiLFxuICAgIFwidHlwZVwiOiBcIm11bHRpcGxlX2Nob2ljZVwiLFxuICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICB7XCJ0aXRsZVwiOiBcIkJ1aWxkIE11c2NsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJidWlsZF9tdXNjbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkxvc2UgRmF0XCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcImxvc2VfZmF0XCJ9LFxuICAgICAge1widGl0bGVcIjogXCJUcmFuc2Zvcm1cIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwidHJhbnNmb3JtXCJ9XG4gICAgXVxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIkhvdyBtdWNoIGZhdCBkbyB5b3Ugd2FudCB0byBsb3NlP1wiLFxuICAgIFwidHlwZVwiOiBcInNsaWRlclwiLFxuICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICBcIm1pblwiOiAwLFxuICAgICAgXCJtYXhcIjogNCxcbiAgICAgIFwibWluX2xhYmVsXCI6IFwiQSBMaXR0bGVcIixcbiAgICAgIFwibWF4X2xhYmVsXCI6IFwiQSBMb3RcIlxuICAgIH1cbiAgfVxuXSJdfQ==
