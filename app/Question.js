
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
          <MultipleChoiceQuestion {...this.props}></MultipleChoiceQuestion>
        )
        break;
      case "number":
        return (
          <NumberQuestion {...this.props}></NumberQuestion>
        )
        break;
      case "height":
        return (
          <HeightQuestion {...this.props}></HeightQuestion>
        )
        break;
      default:
        return (
          <p>Error: unknown question type</p>
        );
    }
	}
});


module.exports = Question;
