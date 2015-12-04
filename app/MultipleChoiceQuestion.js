
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  renderChoice: function(choice, index) {
    return (
      <li key={index}>
        <MultipleChoiceQuestionChoice onSelectChoice={this.props.onAnswerQuestion} choice={choice}></MultipleChoiceQuestionChoice>
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
