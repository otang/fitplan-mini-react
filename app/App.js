var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      questions: Store.getQuestions(),
      answers: Store.getAnswers(),
      currentQuestion: Store.getCurrentQuestion()
    };
  },
  componentWillMount: function () {
    Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },
  changeState: function () {
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
  renderQuestion: function (question, index) {
    if(index !== this.state.currentQuestion) return;
    switch(question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion key={index} question={question}></MultipleChoiceQuestion>
        )
        break;
      default:
        return (
          <div className="question" key={index}>{question.title}</div>
        );
    }
  },


	render: function() {
		return (
      <div id="questionnaire">
        <div className="questions">
          {this.state.questions.map(this.renderQuestion)}
        </div>
      </div>
		);
	}

});




module.exports = App;
