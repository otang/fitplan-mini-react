
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var MultipleChoiceQuestionChoice = React.createClass({
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

  handleClick: function() {
    this.props.onSelectChoice(this.props.choice.value);
  },




	render: function() {
		return (
      <li onClick={this.handleClick}>
        <img src={this.props.choice.image} />
        {this.props.choice.title}
      </li>
		);
	}

});




module.exports = MultipleChoiceQuestionChoice;
