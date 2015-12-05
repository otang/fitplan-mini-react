
var React = require('react');
var MultipleChoiceQuestionChoice = require('./MultipleChoiceQuestionChoice.js');

var MultipleChoiceQuestion = React.createClass({
  getInitialState: function () {
    var state = {selectedChoice: null}
      , _this = this;
    this.props.question.choices.forEach(function(choice) {
      if(_this.props.value === choice.value) {
        state.selectedChoice = choice;
      }
    });
    return state;
  },
  handleSelectChoice: function(selectedChoice) {
    this.setState({selectedChoice: selectedChoice});
    this.props.onAnswerQuestion(selectedChoice.value);
  },
  _isSelected: function(choice) {
    if( !this.state.selectedChoice) return false;
    if(choice.value === this.state.selectedChoice.value) return true;
  },
  renderChoice: function(choice, index) {
    var className = this._isSelected(choice) ? 'selected' : '';
    return (
      <li className={className} key={index}>
        <MultipleChoiceQuestionChoice onSelectChoice={this.handleSelectChoice} choice={choice}></MultipleChoiceQuestionChoice>
      </li>
    );
  },

	render: function() {
		return (
      <div className="question">
        <h3>{this.props.question.title}</h3>
  			<ul className="multipleChoice">
          {this.props.question.choices.map(this.renderChoice)}
        </ul>
      </div>
		);
	}
});


module.exports = MultipleChoiceQuestion;
