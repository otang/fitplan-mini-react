
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
  renderChoice: function(choice, index) {
    return (
      <li key={index}>
        <img src="http://artifacts.bbcomcdn.com/cms-app/1.2.2/i/7ad1f61566b532c742fc4f59fc99bdca25309815.jpg" />
        {choice.title}
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
