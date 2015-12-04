
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var NumberQuestion = React.createClass({
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
        <input name="xxx" value={this.props.value} />
      </div>
		);
	}
});


module.exports = NumberQuestion;
