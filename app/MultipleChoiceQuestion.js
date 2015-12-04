
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
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

  renderChoice: function(choice, index) {
    return (
      <li key={index}>
        <MultipleChoiceQuestionChoice onSelectChoice={this.props.onAnswerQuestion} choice={choice}></MultipleChoiceQuestionChoice>
      </li>
    );
  },


	render: function() {
		return (
			<ul>
        {this.props.question.choices.map(this.renderChoice)}
      </ul>
		);
	}

});




module.exports = MultipleChoiceQuestion;
