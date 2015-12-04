
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


// #todo - Module/mixins
var questionMethods = {

};

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


	render: function() {
		return (
			<span>
        Multiple choice: {this.props.question.title}
      </span>
		);
	}

});




module.exports = MultipleChoiceQuestion;
