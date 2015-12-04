var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = require('./ProgressBar.js');
var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');



var Questionnaire = React.createClass({
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


  handleAnswerQuestion: function(answer) {
    actions.answerQuestion(answer);
    actions.nextQuestion();
  },

  renderQuestion: function (question, index) {
    if(index !== this.state.currentQuestion) return;
    switch(question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion key={index} onAnswerQuestion={this.handleAnswerQuestion} question={question}></MultipleChoiceQuestion>
        )
        break;
      case "number":
        return (
          <NumberQuestion key={index} value={this.state.answers[index]} onAnswerQuestion={this.handleAnswerQuestion} question={question}></NumberQuestion>
        )
        break;
      default:
        return (
          <div className="question" key={index} onAnswerQuestion={this.handleAnswerQuestion}>{question.title}</div>
        );
    }
  },

  handleClickBackButton: function(e) {
    e.preventDefault();
    actions.previousQuestion();
  },


	render: function() {
		return (
      <div>
        <ProgressBar currentQuestion={this.state.currentQuestion} totalQuestions={this.state.questions.length}></ProgressBar>

        <div className="questions">
          {this.state.questions.map(this.renderQuestion)}
        </div>

        <div style={{color: 'gray'}}>
          <small>Answers: {JSON.stringify(this.state.answers)}</small>
        </div>

        <a className="backButton" href onClick={this.handleClickBackButton}>back</a>

      </div>
		);
	}

});




module.exports = Questionnaire;
