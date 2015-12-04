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
      answers: Store.getAnswers()
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
      answers: Store.getAnswers()
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
  renderQuestion: function renderQuestion(question) {
    switch (question.type) {
      case "multiple_choice":
        return React.createElement(MultipleChoiceQuestion, { question: question });
        break;
      default:
        return React.createElement(
          'div',
          { className: 'question' },
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
  // renderQuestion: function (question) {
  //   switch(question.type) {
  //     case "multiple_choice":
  //       return (
  //         <Question question={question}></Question>
  //       )
  //       break;
  //     default:
  //       return (
  //         <div>{question.title}</div>
  //       );
  //   }
  // },

  render: function render() {
    return React.createElement(
      'span',
      null,
      'Multiple choice: ',
      this.props.question.title
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
      {"name": "Male", "image": "/images/xxx.jpg"},
      {"name": "Female", "image": "/images/xxx.jpg"}
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
      {"name": "Build Muscle", "image": "/images/xxx.jpg"},
      {"name": "Lose Fat", "image": "/images/xxx.jpg"},
      {"name": "Transform", "image": "/images/xxx.jpg"}
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL0FwcC5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcyIsIi9Vc2Vycy9NYWNCb29rL3d3dy9maXRwbGFuLW1pbmktcHJvamVjdC9hcHAvU3RvcmUuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL2FjdGlvbnMuanMiLCIvVXNlcnMvTWFjQm9vay93d3cvZml0cGxhbi1taW5pLXByb2plY3QvYXBwL21haW4uanMiLCJhcHAvcXVlc3Rpb25zLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXBFLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxlQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUMvQixhQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRTtLQUM1QixDQUFDO0dBQ0g7QUFDRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDO0FBQ0Qsc0JBQW9CLEVBQUUsZ0NBQVk7QUFDaEMsU0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FB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QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vU3RvcmUuanMnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XG52YXIgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVDaG9pY2VRdWVzdGlvbi5qcycpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICB9LFxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgICAgIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKVxuICAgIH0pO1xuICB9LFxuXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbikge1xuICAgIHN3aXRjaChxdWVzdGlvbi50eXBlKSB7XG4gICAgICBjYXNlIFwibXVsdGlwbGVfY2hvaWNlXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE11bHRpcGxlQ2hvaWNlUXVlc3Rpb24gcXVlc3Rpb249e3F1ZXN0aW9ufT48L011bHRpcGxlQ2hvaWNlUXVlc3Rpb24+XG4gICAgICAgIClcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb25cIj57cXVlc3Rpb24udGl0bGV9PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICB9LFxuXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInF1ZXN0aW9ubmFpcmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWVzdGlvbnNcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5xdWVzdGlvbnMubWFwKHRoaXMucmVuZGVyUXVlc3Rpb24pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxuXG4vLyAjdG9kbyAtIE1vZHVsZS9taXhpbnNcbnZhciBxdWVzdGlvbk1ldGhvZHMgPSB7XG5cbn07XG5cbnZhciBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgLy8gcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgLy8gICAgIC8vIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKVxuICAvLyAgIH07XG4gIC8vIH0sXG4gIC8vIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAvLyAgIFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICAvLyB9LFxuICAvLyBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAvLyAgIFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xuICAvLyB9LFxuICAvLyBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgLy8gcXVlc3Rpb25zOiBTdG9yZS5nZXRRdWVzdGlvbnMoKSxcbiAgLy8gICAgIC8vIGFuc3dlcnM6IFN0b3JlLmdldEFuc3dlcnMoKVxuICAvLyAgIH0pO1xuICAvLyB9LFxuXG5cblxuICAvLyBhZGRNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcbiAgLy8gICBhY3Rpb25zLmFkZE1lc3NhZ2UoaW5wdXQudmFsdWUpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgbmV3TWVzc2FnZTogJydcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcbiAgLy8gICB9KTtcbiAgLy8gfSxcbiAgLy8gcmVuZGVyUXVlc3Rpb246IGZ1bmN0aW9uIChxdWVzdGlvbikge1xuICAvLyAgIHN3aXRjaChxdWVzdGlvbi50eXBlKSB7XG4gIC8vICAgICBjYXNlIFwibXVsdGlwbGVfY2hvaWNlXCI6XG4gIC8vICAgICAgIHJldHVybiAoXG4gIC8vICAgICAgICAgPFF1ZXN0aW9uIHF1ZXN0aW9uPXtxdWVzdGlvbn0+PC9RdWVzdGlvbj5cbiAgLy8gICAgICAgKVxuICAvLyAgICAgICBicmVhaztcbiAgLy8gICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgIHJldHVybiAoXG4gIC8vICAgICAgICAgPGRpdj57cXVlc3Rpb24udGl0bGV9PC9kaXY+XG4gIC8vICAgICAgICk7XG4gIC8vICAgfVxuICAvLyB9LFxuXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW4+XG4gICAgICAgIE11bHRpcGxlIGNob2ljZToge3RoaXMucHJvcHMucXVlc3Rpb24udGl0bGV9XG4gICAgICA8L3NwYW4+XG5cdFx0KTtcblx0fVxuXG59KTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsZUNob2ljZVF1ZXN0aW9uO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xudmFyIHF1ZXN0aW9ucyA9IHJlcXVpcmUoJy4vcXVlc3Rpb25zLmpzb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgYW5zd2VyczogW10sXG4gIGN1cnJlbnRRdWVzdGlvbjogMCxcbiAgcXVlc3Rpb25zOiBxdWVzdGlvbnMsXG4gIGFjdGlvbnM6IFtcbiAgICBhY3Rpb25zLmFuc3dlclF1ZXN0aW9uXG4gIF0sXG4gIGFuc3dlclF1ZXN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdBbnN3ZXJpbmcgcXVlc3Rpb24gIycrdGhpcy5jdXJyZW50UXVlc3Rpb24rJzogJyt2YWx1ZSk7XG4gICAgdGhpcy5hbnN3ZXJzW3RoaXMuY3VycmVudFF1ZXN0aW9uXSA9IHZhbHVlO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hbnN3ZXJzID0gW107XG4gICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSAwO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBwcmV2aW91c1F1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRRdWVzdGlvbiA8PSAwKSByZXR1cm4gMDtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiAtPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuY3VycmVudFF1ZXN0aW9uID49IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMSkgcmV0dXJuIHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtMTtcbiAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiArPSAxO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBleHBvcnRzOiB7XG4gICAgZ2V0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYW5zd2VycztcbiAgICB9LFxuICAgIGdldFF1ZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb25zO1xuICAgIH0sXG4gIH1cbn0pO1xuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ2Fuc3dlclF1ZXN0aW9uJyxcbiAgJ3Jlc2V0JyxcbiAgJ3ByZXZpb3VzUXVlc3Rpb24nLFxuICAnbmV4dFF1ZXN0aW9uJ1xuXSk7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBBcHAgPSByZXF1aXJlKCcuL0FwcC5qcycpO1xuUmVhY3QucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuYm9keSk7XG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiQ2hvb3NlIFlvdXIgR2VuZGVyXCIsXG4gICAgXCJ0eXBlXCI6IFwibXVsdGlwbGVfY2hvaWNlXCIsXG4gICAgXCJjaG9pY2VzXCI6IFtcbiAgICAgIHtcIm5hbWVcIjogXCJNYWxlXCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn0sXG4gICAgICB7XCJuYW1lXCI6IFwiRmVtYWxlXCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiV2hhdCBpcyBZb3VyIEFnZT9cIixcbiAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICB9LFxuICB7XG4gICAgXCJ0aXRsZVwiOiBcIldoYXQgaXMgWW91ciBIZWlnaHQ/XCIsXG4gICAgXCJ0eXBlXCI6IFwiaGVpZ2h0XCJcbiAgfSxcbiAge1xuICAgIFwidGl0bGVcIjogXCJDaG9vc2UgWW91ciBNYWluIEdvYWxcIixcbiAgICBcInR5cGVcIjogXCJtdWx0aXBsZV9jaG9pY2VcIixcbiAgICBcImNob2ljZXNcIjogW1xuICAgICAge1wibmFtZVwiOiBcIkJ1aWxkIE11c2NsZVwiLCBcImltYWdlXCI6IFwiL2ltYWdlcy94eHguanBnXCJ9LFxuICAgICAge1wibmFtZVwiOiBcIkxvc2UgRmF0XCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn0sXG4gICAgICB7XCJuYW1lXCI6IFwiVHJhbnNmb3JtXCIsIFwiaW1hZ2VcIjogXCIvaW1hZ2VzL3h4eC5qcGdcIn1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiSG93IG11Y2ggZmF0IGRvIHlvdSB3YW50IHRvIGxvc2U/XCIsXG4gICAgXCJ0eXBlXCI6IFwic2xpZGVyXCIsXG4gICAgXCJvcHRpb25zXCI6IHtcbiAgICAgIFwibWluXCI6IDAsXG4gICAgICBcIm1heFwiOiA0LFxuICAgICAgXCJtaW5fbGFiZWxcIjogXCJBIExpdHRsZVwiLFxuICAgICAgXCJtYXhfbGFiZWxcIjogXCJBIExvdFwiXG4gICAgfVxuICB9XG5dIl19
