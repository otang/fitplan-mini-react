(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MacBook/www/fitplan-mini-project/app/App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var Questionnaire = require('./Questionnaire.js');
var ThankYou = require('./ThankYou.js');
var Results = require('./Results.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      // page: "questionnaire"
      // page: "thank_you"
      page: "results"
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
      case "thank_you":
        return React.createElement(ThankYou, null);
        break;
      case "results":
        return React.createElement(Results, null);
        break;
      default:
        return React.createElement(
          'p',
          null,
          '404 Page not found'
        );
    }
  }

});

module.exports = App;

},{"./Questionnaire.js":"/Users/MacBook/www/fitplan-mini-project/app/Questionnaire.js","./Results.js":"/Users/MacBook/www/fitplan-mini-project/app/Results.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./ThankYou.js":"/Users/MacBook/www/fitplan-mini-project/app/ThankYou.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/FitnessPlan.js":[function(require,module,exports){
"use strict";

var React = require('react');

var FitnessPlan = React.createClass({
  displayName: "FitnessPlan",

  render: function render() {
    return React.createElement(
      "div",
      { className: "plan" },
      this.props.plan.title
    );
  }
});

module.exports = FitnessPlan;

},{"react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/HeightQuestion.js":[function(require,module,exports){
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

},{"./ProgressBar.js":"/Users/MacBook/www/fitplan-mini-project/app/ProgressBar.js","./Question.js":"/Users/MacBook/www/fitplan-mini-project/app/Question.js","./Store.js":"/Users/MacBook/www/fitplan-mini-project/app/Store.js","./actions.js":"/Users/MacBook/www/fitplan-mini-project/app/actions.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Results.js":[function(require,module,exports){
'use strict';

var React = require('react');
var FitnessPlan = require('./FitnessPlan.js');

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Randomize the plans
var plans = shuffle(require('./plans.json'));

var Results = React.createClass({
  displayName: 'Results',

  getInitialState: function getInitialState() {
    var topPlan = plans.shift();
    return {
      topPlan: topPlan,
      recommendedPlans: plans
    };
  },

  renderPlan: function renderPlan(plan, index) {
    return React.createElement(FitnessPlan, { key: index, plan: plan });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'results' },
      React.createElement(
        'h1',
        null,
        'Find your Fitplan'
      ),
      React.createElement(
        'p',
        null,
        'Complete fitness plans from the industry\'s best experts. Every plan includes workouts, nutrition information, supplement advice, and more. Whatever your goal, we\'ve got your guide.'
      ),
      React.createElement(
        'h3',
        null,
        'Top Plan For You'
      ),
      React.createElement(
        'div',
        { className: 'topPlan' },
        this.renderPlan(this.state.topPlan)
      ),
      React.createElement(
        'h4',
        null,
        'Other Recommended Plans'
      ),
      React.createElement(
        'div',
        { className: 'recommendedPlans' },
        this.state.recommendedPlans.map(this.renderPlan)
      )
    );
  }
});

module.exports = Results;

},{"./FitnessPlan.js":"/Users/MacBook/www/fitplan-mini-project/app/FitnessPlan.js","./plans.json":"/Users/MacBook/www/fitplan-mini-project/app/plans.json","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/Store.js":[function(require,module,exports){
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
"use strict";

var React = require('react');

var ThankYou = React.createClass({
  displayName: "ThankYou",

  render: function render() {
    return React.createElement(
      "div",
      { className: "thankYou" },
      React.createElement(
        "h1",
        null,
        "You're done!"
      ),
      React.createElement(
        "p",
        null,
        React.createElement(
          "a",
          { href: "#" },
          "Connect with Facebook"
        ),
        " now to see your personalized results."
      )
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

},{"./App.js":"/Users/MacBook/www/fitplan-mini-project/app/App.js","react":"react"}],"/Users/MacBook/www/fitplan-mini-project/app/plans.json":[function(require,module,exports){
module.exports=[
  {
    "title": "Thrive Fitplan",
    "author": {
      "name": "Brendan Brazier",
      "avatar": "http://8h9h50uinf-flywheel.netdna-ssl.com/wp-content/uploads/2015/09/BrendanBrazier_site_page_thumbnail2-600x403.png"
    },
    "overview": "I designed this routine to convert the strength you’ve built in the Max strength / build / afterburn workout into power, which will equate to great efficiency and directly be translated into fluidity of movement and therefore reduced cardiovascular strain during daily activity. Go from one excise to the next, with as little rest in between as possible."
  },
  {
    "title": "Example Fitplan #1",
    "author": {
      "name": "Ingrid Romero",
      "avatar": "http://8h9h50uinf-flywheel.netdna-ssl.com/wp-content/uploads/2015/08/PortfolioThumb-IngridRomero-retouched-600x403.jpg"
    },
    "overview": "I designed this routine to convert the strength you’ve built in the Max strength / build / afterburn workout into power, which will equate to great efficiency and directly be translated into fluidity of movement and therefore reduced cardiovascular strain during daily activity. Go from one excise to the next, with as little rest in between as possible."
  },
  {
    "title": "Example Fitplan #2",
    "author": {
      "name": "Lauren Abraham",
      "avatar": "http://8h9h50uinf-flywheel.netdna-ssl.com/wp-content/uploads/2015/08/PortfolioThumb-LaurenAbraham-600x403.jpg"
    },
    "overview": "I designed this routine to convert the strength you’ve built in the Max strength / build / afterburn workout into power, which will equate to great efficiency and directly be translated into fluidity of movement and therefore reduced cardiovascular strain during daily activity. Go from one excise to the next, with as little rest in between as possible."
  },
  {
    "title": "Example Fitplan #3",
    "author": {
      "name": "Nikkee Lee",
      "avatar": "http://8h9h50uinf-flywheel.netdna-ssl.com/wp-content/uploads/2015/08/MobileSlider-NikkeeLee-retouched-600x403.jpg"
    },
    "overview": "I designed this routine to convert the strength you’ve built in the Max strength / build / afterburn workout into power, which will equate to great efficiency and directly be translated into fluidity of movement and therefore reduced cardiovascular strain during daily activity. Go from one excise to the next, with as little rest in between as possible."
  },
]
},{}],"/Users/MacBook/www/fitplan-mini-project/app/questions.json":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0FwcC5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvRml0bmVzc1BsYW4uanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0hlaWdodFF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9OdW1iZXJRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvUHJvZ3Jlc3NCYXIuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL1F1ZXN0aW9uLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9RdWVzdGlvbm5haXJlLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9SZXN1bHRzLmpzIiwiL1VzZXJzL01hY0Jvb2svd3d3L2ZpdHBsYW4tbWluaS1wcm9qZWN0L2FwcC9TdG9yZS5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvVGhhbmtZb3UuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL2FjdGlvbnMuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL21haW4uanMiLCJhcHAvcGxhbnMuanNvbiIsImFwcC9xdWVzdGlvbnMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBR3RDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBSXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87OztBQUdMLFVBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUM7R0FDSDs7QUFFRCxzQkFBb0IsRUFBRSxnQ0FBVzs7QUFFL0IsV0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ2pELFdBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDaEMsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0dBQ3BDOztBQUVGLFFBQU0sRUFBRSxrQkFBVztBQUNoQixZQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUNwQixXQUFLLGVBQWU7QUFDbEIsZUFDRSxvQkFBQyxhQUFhLElBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQUFBQyxHQUFpQixDQUN0RTtBQUNGLGNBQU07QUFBQSxBQUNSLFdBQUssV0FBVztBQUNkLGVBQ0Usb0JBQUMsUUFBUSxPQUFZLENBQ3JCO0FBQ0YsY0FBTTtBQUFBLEFBQ1Is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T0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxPQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUNGckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG52YXIgUXVlc3Rpb25uYWlyZSA9IHJlcXVpcmUoJy4vUXVlc3Rpb25uYWlyZS5qcycpO1xudmFyIFRoYW5rWW91ID0gcmVxdWlyZSgnLi9UaGFua1lvdS5qcycpO1xudmFyIFJlc3VsdHMgPSByZXF1aXJlKCcuL1Jlc3VsdHMuanMnKTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBwYWdlOiBcInF1ZXN0aW9ubmFpcmVcIlxuICAgICAgLy8gcGFnZTogXCJ0aGFua195b3VcIlxuICAgICAgcGFnZTogXCJyZXN1bHRzXCJcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZVN1cnZleUNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblxuICAgIGNvbnNvbGUubG9nKCd0aGFua3MgZm9yIGNvbXBsZXRpbmcgdGhlIHN1cnZleSEnKTtcbiAgICBjb25zb2xlLmxvZyhTdG9yZS5nZXRBbnN3ZXJzKCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2U6ICd0aGFua195b3UnfSk7XG4gIH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2godGhpcy5zdGF0ZS5wYWdlKSB7XG4gICAgICBjYXNlIFwicXVlc3Rpb25uYWlyZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxRdWVzdGlvbm5haXJlIG9uQ29tcGxldGU9e3RoaXMuaGFuZGxlU3VydmV5Q29tcGxldGV9PjwvUXVlc3Rpb25uYWlyZT5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidGhhbmtfeW91XCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFRoYW5rWW91PjwvVGhhbmtZb3U+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJlc3VsdHNcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8UmVzdWx0cz48L1Jlc3VsdHM+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8cD40MDQgUGFnZSBub3QgZm91bmQ8L3A+XG4gICAgICAgICk7XG4gICAgfVxuXHR9XG5cbn0pO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIEZpdG5lc3NQbGFuID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhblwiPlxuICAgICAgICB7dGhpcy5wcm9wcy5wbGFuLnRpdGxlfVxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBGaXRuZXNzUGxhbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG5cblxudmFyIEhlaWdodFF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICBmZWV0OiBudWxsLFxuICAgICAgaW5jaGVzOiBudWxsXG4gICAgfVxuXG4gICAgLy8gaWUuIDYnMTBcIlxuICAgIGlmKHN0YXRlLmhlaWdodCAmJiB0eXBlb2Ygc3RhdGUuaGVpZ2h0ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc29sZS5sb2coJ0hlaWdodCB2YWx1ZSBpcyAnK3N0YXRlLmhlaWdodCk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IHN0YXRlLmhlaWdodC5tYXRjaCgvKFxcZCspL2cpO1xuICAgICAgaWYobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIHN0YXRlLmZlZXQgPSBtYXRjaGVzWzBdO1xuICAgICAgICBzdGF0ZS5pbmNoZXMgPSBtYXRjaGVzWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoICF0aGlzLnN0YXRlLmZlZXQgfHwgIXRoaXMuc3RhdGUuaW5jaGVzKSByZXR1cm47XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuc3RhdGUuZmVldCtcIicgXCIrdGhpcy5zdGF0ZS5pbmNoZXMrJ1wiJztcbiAgICB0aGlzLnByb3BzLm9uQW5zd2VyUXVlc3Rpb24oaGVpZ2h0KTtcbiAgfSxcblxuICBoYW5kbGVGZWV0Q2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZmVldDogZS50YXJnZXQudmFsdWV9KTtcbiAgfSxcbiAgaGFuZGxlSW5jaGVzQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aW5jaGVzOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJmZWV0XCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmVldENoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuZmVldH0gLz5cbiAgICAgICAgICA8aW5wdXQgbmFtZT1cImluY2hlc1wiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUluY2hlc0NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuaW5jaGVzfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBIZWlnaHRRdWVzdGlvbjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlID0gcmVxdWlyZSgnLi9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlLmpzJyk7XG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7c2VsZWN0ZWRDaG9pY2U6IG51bGx9XG4gICAgICAsIF90aGlzID0gdGhpcztcbiAgICB0aGlzLnByb3BzLnF1ZXN0aW9uLmNob2ljZXMuZm9yRWFjaChmdW5jdGlvbihjaG9pY2UpIHtcbiAgICAgIGlmKF90aGlzLnByb3BzLnZhbHVlID09PSBjaG9pY2UudmFsdWUpIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWRDaG9pY2UgPSBjaG9pY2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9LFxuICBoYW5kbGVTZWxlY3RDaG9pY2U6IGZ1bmN0aW9uKHNlbGVjdGVkQ2hvaWNlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRDaG9pY2U6IHNlbGVjdGVkQ2hvaWNlfSk7XG4gICAgdGhpcy5wcm9wcy5vbkFuc3dlclF1ZXN0aW9uKHNlbGVjdGVkQ2hvaWNlLnZhbHVlKTtcbiAgfSxcbiAgX2lzU2VsZWN0ZWQ6IGZ1bmN0aW9uKGNob2ljZSkge1xuICAgIGlmKCAhdGhpcy5zdGF0ZS5zZWxlY3RlZENob2ljZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGNob2ljZS52YWx1ZSA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZENob2ljZS52YWx1ZSkgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHJlbmRlckNob2ljZTogZnVuY3Rpb24oY2hvaWNlLCBpbmRleCkge1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLl9pc1NlbGVjdGVkKGNob2ljZSkgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZX0ga2V5PXtpbmRleH0+XG4gICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlIG9uU2VsZWN0Q2hvaWNlPXt0aGlzLmhhbmRsZVNlbGVjdENob2ljZX0gY2hvaWNlPXtjaG9pY2V9PjwvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZT5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCI+XG4gICAgICAgIDxoMz57dGhpcy5wcm9wcy5xdWVzdGlvbi50aXRsZX08L2gzPlxuICBcdFx0XHQ8dWw+XG4gICAgICAgICAge3RoaXMucHJvcHMucXVlc3Rpb24uY2hvaWNlcy5tYXAodGhpcy5yZW5kZXJDaG9pY2UpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uQ2hvaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0Q2hvaWNlKHRoaXMucHJvcHMuY2hvaWNlKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICA8aW1nIHNyYz17dGhpcy5wcm9wcy5jaG9pY2UuaW1hZ2V9IC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNob2ljZS50aXRsZX1cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNob2ljZTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgTnVtYmVyUXVlc3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKCAhdGhpcy5zdGF0ZS52YWx1ZSkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMub25BbnN3ZXJRdWVzdGlvbih0aGlzLnN0YXRlLnZhbHVlKTtcbiAgfSxcblxuICBoYW5kbGVWYWx1ZUNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj5cbiAgICAgICAgPGgzPnt0aGlzLnByb3BzLnF1ZXN0aW9uLnRpdGxlfTwvaDM+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGlucHV0IG5hbWU9XCJudW1iZXJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVWYWx1ZUNoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlclF1ZXN0aW9uO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgUHJvZ3Jlc3NCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPHNwYW4+e3RoaXMucHJvcHMuY3VycmVudFF1ZXN0aW9uKzF9IC8ge3RoaXMucHJvcHMudG90YWxRdWVzdGlvbnN9PC9zcGFuPlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXI7XG4iLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZUNob2ljZVF1ZXN0aW9uLmpzJyk7XG52YXIgTnVtYmVyUXVlc3Rpb24gPSByZXF1aXJlKCcuL051bWJlclF1ZXN0aW9uLmpzJyk7XG52YXIgSGVpZ2h0UXVlc3Rpb24gPSByZXF1aXJlKCcuL0hlaWdodFF1ZXN0aW9uLmpzJyk7XG5cblxudmFyIFF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMucXVlc3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBcIm11bHRpcGxlX2Nob2ljZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNdWx0aXBsZUNob2ljZVF1ZXN0aW9uIHsuLi50aGlzLnByb3BzfT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE51bWJlclF1ZXN0aW9uIHsuLi50aGlzLnByb3BzfT48L051bWJlclF1ZXN0aW9uPlxuICAgICAgICApXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImhlaWdodFwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxIZWlnaHRRdWVzdGlvbiB7Li4udGhpcy5wcm9wc30+PC9IZWlnaHRRdWVzdGlvbj5cbiAgICAgICAgKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHA+RXJyb3I6IHVua25vd24gcXVlc3Rpb24gdHlwZTwvcD5cbiAgICAgICAgKTtcbiAgICB9XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb247XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgnLi9Qcm9ncmVzc0Jhci5qcycpO1xudmFyIFF1ZXN0aW9uID0gcmVxdWlyZSgnLi9RdWVzdGlvbi5qcycpO1xuXG5cblxudmFyIFF1ZXN0aW9ubmFpcmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVzdGlvbnM6IFN0b3JlLmdldFF1ZXN0aW9ucygpLFxuICAgICAgYW5zd2VyczogU3RvcmUuZ2V0QW5zd2VycygpLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBTdG9yZS5nZXRDdXJyZW50UXVlc3Rpb24oKVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogU3RvcmUuZ2V0Q3VycmVudFF1ZXN0aW9uKClcbiAgICB9KTtcbiAgfSxcblxuXG4gIC8vIGFkZE1lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAvLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld01lc3NhZ2UuZ2V0RE9NTm9kZSgpO1xuICAvLyAgIGFjdGlvbnMuYWRkTWVzc2FnZShpbnB1dC52YWx1ZSk7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiAnJ1xuICAvLyAgIH0pO1xuICAvLyB9LFxuICAvLyB1cGRhdGVOZXdNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgIG5ld01lc3NhZ2U6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAvLyAgIH0pO1xuICAvLyB9LFxuXG5cbiAgaGFuZGxlQW5zd2VyUXVlc3Rpb246IGZ1bmN0aW9uKGFuc3dlcikge1xuICAgIGFjdGlvbnMuYW5zd2VyUXVlc3Rpb24oYW5zd2VyKTtcblxuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9uID49IHRoaXMuc3RhdGUucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIFF1ZXN0aW9ubmFpcmUgaXMgY29tcGxldGVcbiAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb25zLm5leHRRdWVzdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXJRdWVzdGlvbjogZnVuY3Rpb24gKHF1ZXN0aW9uLCBpbmRleCkge1xuICAgIGlmKGluZGV4ICE9PSB0aGlzLnN0YXRlLmN1cnJlbnRRdWVzdGlvbikgcmV0dXJuO1xuICAgIHJldHVybiAoXG4gICAgICA8UXVlc3Rpb24ga2V5PXtpbmRleH0gdmFsdWU9e3RoaXMuc3RhdGUuYW5zd2Vyc1tpbmRleF19IG9uQW5zd2VyUXVlc3Rpb249e3RoaXMuaGFuZGxlQW5zd2VyUXVlc3Rpb259IHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9RdWVzdGlvbj5cbiAgICApO1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrQmFja0J1dHRvbjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhY3Rpb25zLnByZXZpb3VzUXVlc3Rpb24oKTtcbiAgfSxcblxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9ncmVzc0JhciBjdXJyZW50UXVlc3Rpb249e3RoaXMuc3RhdGUuY3VycmVudFF1ZXN0aW9ufSB0b3RhbFF1ZXN0aW9ucz17dGhpcy5zdGF0ZS5xdWVzdGlvbnMubGVuZ3RofT48L1Byb2dyZXNzQmFyPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25zXCI+XG4gICAgICAgICAge3RoaXMuc3RhdGUucXVlc3Rpb25zLm1hcCh0aGlzLnJlbmRlclF1ZXN0aW9uKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnZ3JheSd9fT5cbiAgICAgICAgICA8c21hbGw+QW5zd2Vyczoge0pTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuYW5zd2Vycyl9PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYmFja0J1dHRvblwiIGhyZWYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JhY2tCdXR0b259PmJhY2s8L2E+XG5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUXVlc3Rpb25uYWlyZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRml0bmVzc1BsYW4gPSByZXF1aXJlKCcuL0ZpdG5lc3NQbGFuLmpzJyk7XG5cbmZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4IDtcbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8vIFJhbmRvbWl6ZSB0aGUgcGxhbnNcbnZhciBwbGFucyA9IHNodWZmbGUocmVxdWlyZSgnLi9wbGFucy5qc29uJykpO1xuXG5cbnZhciBSZXN1bHRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9wUGxhbiA9IHBsYW5zLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcFBsYW46IHRvcFBsYW4sXG4gICAgICByZWNvbW1lbmRlZFBsYW5zOiBwbGFuc1xuICAgIH07XG4gIH0sXG5cbiAgcmVuZGVyUGxhbjogZnVuY3Rpb24ocGxhbiwgaW5kZXgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEZpdG5lc3NQbGFuIGtleT17aW5kZXh9IHBsYW49e3BsYW59PjwvRml0bmVzc1BsYW4+XG4gICAgKTtcbiAgfSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdHNcIj5cbiAgICAgICAgPGgxPkZpbmQgeW91ciBGaXRwbGFuPC9oMT5cbiAgICAgICAgPHA+Q29tcGxldGUgZml0bmVzcyBwbGFucyBmcm9tIHRoZSBpbmR1c3RyeSdzIGJlc3QgZXhwZXJ0cy4gRXZlcnkgcGxhbiBpbmNsdWRlcyB3b3Jrb3V0cywgbnV0cml0aW9uIGluZm9ybWF0aW9uLCBzdXBwbGVtZW50IGFkdmljZSwgYW5kIG1vcmUuIFdoYXRldmVyIHlvdXIgZ29hbCwgd2UndmUgZ290IHlvdXIgZ3VpZGUuPC9wPlxuXG5cbiAgICAgICAgPGgzPlRvcCBQbGFuIEZvciBZb3U8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcFBsYW5cIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFuKHRoaXMuc3RhdGUudG9wUGxhbil9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxoND5PdGhlciBSZWNvbW1lbmRlZCBQbGFuczwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVjb21tZW5kZWRQbGFuc1wiPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLnJlY29tbWVuZGVkUGxhbnMubWFwKHRoaXMucmVuZGVyUGxhbil9XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzdWx0cztcblxuXG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgcXVlc3Rpb25zID0gcmVxdWlyZSgnLi9xdWVzdGlvbnMuanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICBhbnN3ZXJzOiBbXSxcbiAgY3VycmVudFF1ZXN0aW9uOiAwLFxuICBxdWVzdGlvbnM6IHF1ZXN0aW9ucyxcbiAgLy8gcGFnZTogJ3F1ZXN0aW9ubmFpcmUnLFxuXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uLFxuICAgIGFjdGlvbnMucmVzZXQsXG4gICAgYWN0aW9ucy5wcmV2aW91c1F1ZXN0aW9uLFxuICAgIGFjdGlvbnMubmV4dFF1ZXN0aW9uXG4gIF0sXG4gIGFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdBbnN3ZXJpbmcgcXVlc3Rpb24gIycrdGhpcy5jdXJyZW50UXVlc3Rpb24rJzogJyt2YWx1ZSk7XG4gICAgdGhpcy5hbnN3ZXJzW3RoaXMuY3VycmVudFF1ZXN0aW9uXSA9IHZhbHVlO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hbnN3ZXJzID0gW107XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSAwO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBwcmV2aW91c1F1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA8PSAwKSByZXR1cm4gMDtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiAtPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uID49IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMSkgcmV0dXJuIHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiArPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBleHBvcnRzOiB7XG4gICAgZ2V0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYW5zd2VycztcbiAgICB9LFxuICAgIGdldFF1ZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFF1ZXN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50UXVlc3Rpb247XG4gICAgfSxcbiAgICAvLyBnZXRQYWdlOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgIHJldHVybiB0aGlzLnBhZ2U7XG4gICAgLy8gfSxcbiAgICAvLyBzZXRQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgLy8gfVxuICB9XG59KTtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG52YXIgVGhhbmtZb3UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aGFua1lvdVwiPlxuICAgICAgICA8aDE+WW91J3JlIGRvbmUhPC9oMT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5Db25uZWN0IHdpdGggRmFjZWJvb2s8L2E+IG5vdyB0byBzZWUgeW91ciBwZXJzb25hbGl6ZWQgcmVzdWx0cy5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBUaGFua1lvdTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhbnN3ZXJRdWVzdGlvbicsXG4gICdyZXNldCcsXG4gICdwcmV2aW91c1F1ZXN0aW9uJyxcbiAgJ25leHRRdWVzdGlvbidcbl0pOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9BcHAuanMnKTtcblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiVGhyaXZlIEZpdHBsYW5cIixcbiAgICBcImF1dGhvclwiOiB7XG4gICAgICBcIm5hbWVcIjogXCJCcmVuZGFuIEJyYXppZXJcIixcbiAgICAgIFwiYXZhdGFyXCI6IFwiaHR0cDovLzhoOWg1MHVpbmYtZmx5d2hlZWwubmV0ZG5hLXNzbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDkvQnJlbmRhbkJyYXppZXJfc2l0ZV9wYWdlX3RodW1ibmFpbDItNjAweDQwMy5wbmdcIlxuICAgIH0sXG4gICAgXCJvdmVydmlld1wiOiBcIkkgZGVzaWduZWQgdGhpcyByb3V0aW5lIHRvIGNvbnZlcnQgdGhlIHN0cmVuZ3RoIHlvdeKAmXZlIGJ1aWx0IGluIHRoZSBNYXggc3RyZW5ndGggLyBidWlsZCAvIGFmdGVyYnVybiB3b3Jrb3V0IGludG8gcG93ZXIsIHdoaWNoIHdpbGwgZXF1YXRlIHRvIGdyZWF0IGVmZmljaWVuY3kgYW5kIGRpcmVjdGx5IGJlIHRyYW5zbGF0ZWQgaW50byBmbHVpZGl0eSBvZiBtb3ZlbWVudCBhbmQgdGhlcmVmb3JlIHJlZHVjZWQgY2FyZGlvdmFzY3VsYXIgc3RyYWluIGR1cmluZyBkYWlseSBhY3Rpdml0eS4gR28gZnJvbSBvbmUgZXhjaXNlIHRvIHRoZSBuZXh0LCB3aXRoIGFzIGxpdHRsZSByZXN0IGluIGJldHdlZW4gYXMgcG9zc2libGUuXCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJFeGFtcGxlIEZpdHBsYW4gIzFcIixcbiAgICBcImF1dGhvclwiOiB7XG4gICAgICBcIm5hbWVcIjogXCJJbmdyaWQgUm9tZXJvXCIsXG4gICAgICBcImF2YXRhclwiOiBcImh0dHA6Ly84aDloNTB1aW5mLWZseXdoZWVsLm5ldGRuYS1zc2wuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzA4L1BvcnRmb2xpb1RodW1iLUluZ3JpZFJvbWVyby1yZXRvdWNoZWQtNjAweDQwMy5qcGdcIlxuICAgIH0sXG4gICAgXCJvdmVydmlld1wiOiBcIkkgZGVzaWduZWQgdGhpcyByb3V0aW5lIHRvIGNvbnZlcnQgdGhlIHN0cmVuZ3RoIHlvdeKAmXZlIGJ1aWx0IGluIHRoZSBNYXggc3RyZW5ndGggLyBidWlsZCAvIGFmdGVyYnVybiB3b3Jrb3V0IGludG8gcG93ZXIsIHdoaWNoIHdpbGwgZXF1YXRlIHRvIGdyZWF0IGVmZmljaWVuY3kgYW5kIGRpcmVjdGx5IGJlIHRyYW5zbGF0ZWQgaW50byBmbHVpZGl0eSBvZiBtb3ZlbWVudCBhbmQgdGhlcmVmb3JlIHJlZHVjZWQgY2FyZGlvdmFzY3VsYXIgc3RyYWluIGR1cmluZyBkYWlseSBhY3Rpdml0eS4gR28gZnJvbSBvbmUgZXhjaXNlIHRvIHRoZSBuZXh0LCB3aXRoIGFzIGxpdHRsZSByZXN0IGluIGJldHdlZW4gYXMgcG9zc2libGUuXCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJFeGFtcGxlIEZpdHBsYW4gIzJcIixcbiAgICBcImF1dGhvclwiOiB7XG4gICAgICBcIm5hbWVcIjogXCJMYXVyZW4gQWJyYWhhbVwiLFxuICAgICAgXCJhdmF0YXJcIjogXCJodHRwOi8vOGg5aDUwdWluZi1mbHl3aGVlbC5uZXRkbmEtc3NsLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wOC9Qb3J0Zm9saW9UaHVtYi1MYXVyZW5BYnJhaGFtLTYwMHg0MDMuanBnXCJcbiAgICB9LFxuICAgIFwib3ZlcnZpZXdcIjogXCJJIGRlc2lnbmVkIHRoaXMgcm91dGluZSB0byBjb252ZXJ0IHRoZSBzdHJlbmd0aCB5b3XigJl2ZSBidWlsdCBpbiB0aGUgTWF4IHN0cmVuZ3RoIC8gYnVpbGQgLyBhZnRlcmJ1cm4gd29ya291dCBpbnRvIHBvd2VyLCB3aGljaCB3aWxsIGVxdWF0ZSB0byBncmVhdCBlZmZpY2llbmN5IGFuZCBkaXJlY3RseSBiZSB0cmFuc2xhdGVkIGludG8gZmx1aWRpdHkgb2YgbW92ZW1lbnQgYW5kIHRoZXJlZm9yZSByZWR1Y2VkIGNhcmRpb3Zhc2N1bGFyIHN0cmFpbiBkdXJpbmcgZGFpbHkgYWN0aXZpdHkuIEdvIGZyb20gb25lIGV4Y2lzZSB0byB0aGUgbmV4dCwgd2l0aCBhcyBsaXR0bGUgcmVzdCBpbiBiZXR3ZWVuIGFzIHBvc3NpYmxlLlwiXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiRXhhbXBsZSBGaXRwbGFuICMzXCIsXG4gICAgXCJhdXRob3JcIjoge1xuICAgICAgXCJuYW1lXCI6IFwiTmlra2VlIExlZVwiLFxuICAgICAgXCJhdmF0YXJcIjogXCJodHRwOi8vOGg5aDUwdWluZi1mbHl3aGVlbC5uZXRkbmEtc3NsLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8wOC9Nb2JpbGVTbGlkZXItTmlra2VlTGVlLXJldG91Y2hlZC02MDB4NDAzLmpwZ1wiXG4gICAgfSxcbiAgICBcIm92ZXJ2aWV3XCI6IFwiSSBkZXNpZ25lZCB0aGlzIHJvdXRpbmUgdG8gY29udmVydCB0aGUgc3RyZW5ndGggeW914oCZdmUgYnVpbHQgaW4gdGhlIE1heCBzdHJlbmd0aCAvIGJ1aWxkIC8gYWZ0ZXJidXJuIHdvcmtvdXQgaW50byBwb3dlciwgd2hpY2ggd2lsbCBlcXVhdGUgdG8gZ3JlYXQgZWZmaWNpZW5jeSBhbmQgZGlyZWN0bHkgYmUgdHJhbnNsYXRlZCBpbnRvIGZsdWlkaXR5IG9mIG1vdmVtZW50IGFuZCB0aGVyZWZvcmUgcmVkdWNlZCBjYXJkaW92YXNjdWxhciBzdHJhaW4gZHVyaW5nIGRhaWx5IGFjdGl2aXR5LiBHbyBmcm9tIG9uZSBleGNpc2UgdG8gdGhlIG5leHQsIHdpdGggYXMgbGl0dGxlIHJlc3QgaW4gYmV0d2VlbiBhcyBwb3NzaWJsZS5cIlxuICB9LFxuXSIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBHZW5kZXJcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJNYWxlXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcIm1hbGVcIn0sXG4gICAgICB7XCJ0aXRsZVwiOiBcIkZlbWFsZVwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJmZW1hbGVcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBNYWluIEdvYWxcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1widGl0bGVcIjogXCJCdWlsZCBNdXNjbGVcIiwgXCJpbWFnZVwiOiBcImh0dHA6Ly9hcnRpZmFjdHMuYmJjb21jZG4uY29tL2Ntcy1hcHAvMS4yLjIvaS83YWQxZjYxNTY2YjUzMmM3NDJmYzRmNTlmYzk5YmRjYTI1MzA5ODE1LmpwZ1wiLCBcInZhbHVlXCI6IFwiYnVpbGRfbXVzY2xlXCJ9LFxuICAgICAge1widGl0bGVcIjogXCJMb3NlIEZhdFwiLCBcImltYWdlXCI6IFwiaHR0cDovL2FydGlmYWN0cy5iYmNvbWNkbi5jb20vY21zLWFwcC8xLjIuMi9pLzdhZDFmNjE1NjZiNTMyYzc0MmZjNGY1OWZjOTliZGNhMjUzMDk4MTUuanBnXCIsIFwidmFsdWVcIjogXCJsb3NlX2ZhdFwifSxcbiAgICAgIHtcInRpdGxlXCI6IFwiVHJhbnNmb3JtXCIsIFwiaW1hZ2VcIjogXCJodHRwOi8vYXJ0aWZhY3RzLmJiY29tY2RuLmNvbS9jbXMtYXBwLzEuMi4yL2kvN2FkMWY2MTU2NmI1MzJjNzQyZmM0ZjU5ZmM5OWJkY2EyNTMwOTgxNS5qcGdcIiwgXCJ2YWx1ZVwiOiBcInRyYW5zZm9ybVwifVxuICAgIF1cbiAgfVxuXSJdfQ==
