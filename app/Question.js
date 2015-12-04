
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var MultipleChoiceQuestion = require('./MultipleChoiceQuestion.js');
var NumberQuestion = require('./NumberQuestion.js');
var HeightQuestion = require('./HeightQuestion.js');


var Question = React.createClass({

	render: function() {
    switch(this.props.question.type) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion value={this.props.value} onAnswerQuestion={this.props.onAnswerQuestion} question={this.props.question}></MultipleChoiceQuestion>
        )
        break;
      case "number":
        return (
          <NumberQuestion value={this.props.value} onAnswerQuestion={this.props.onAnswerQuestion} question={this.props.question}></NumberQuestion>
        )
        break;
      case "height":
        return (
          <HeightQuestion value={this.props.value} onAnswerQuestion={this.props.onAnswerQuestion} question={this.props.question}></HeightQuestion>
        )
        break;
      default:
        return (
          <div className="question" value={this.props.value} onAnswerQuestion={this.props.onAnswerQuestion} question={this.props.question}>{question.title}</div>
        );
    }
	}
});


module.exports = Question;
