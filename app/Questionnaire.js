var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var ProgressBar = require('./ProgressBar.js');
var Question = require('./Question.js');



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

    if(this.state.currentQuestion >= this.state.questions.length - 1) {
      // this.props.onComplete(this.state.answers);
      Store.setPage('tanks');

    } else {
      actions.nextQuestion();
    }

  },

  renderQuestion: function (question, index) {
    if(index !== this.state.currentQuestion) return;
    return (
      <Question key={index} value={this.state.answers[index]} onAnswerQuestion={this.handleAnswerQuestion} question={question}></Question>
    );
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
