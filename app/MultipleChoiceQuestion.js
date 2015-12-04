
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  handleSelectChoice: function(selectedChoice) {
    this.props.onAnswerQuestion(selectedChoice.value);
  },
  renderChoice: function(choice, index) {
    return (
      <li key={index}>
        <MultipleChoiceQuestionChoice onSelectChoice={this.handleSelectChoice} choice={choice} choices={this.props.question.choices}></MultipleChoiceQuestionChoice>
      </li>
    );
  },

	render: function() {
		return (
      <div className="question">
        <h3>{this.props.question.title}</h3>
  			<ul>
          {this.props.question.choices.map(this.renderChoice)}
        </ul>
      </div>
		);
	}
});


module.exports = MultipleChoiceQuestion;
