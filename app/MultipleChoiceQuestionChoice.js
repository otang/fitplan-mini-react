
var React = require('react');


var MultipleChoiceQuestionChoice = React.createClass({

  handleClick: function() {
    this.props.onSelectChoice(this.props.choice);
  },

	render: function() {
		return (
      <div onClick={this.handleClick}>
        <img src={this.props.choice.image} />
        {this.props.choice.title}
      </div>
		);
	}

});




module.exports = MultipleChoiceQuestionChoice;
