
var React = require('react');
var Store = require('./Store.js');


var MultipleChoiceQuestionChoice = React.createClass({

  handleClick: function() {
    this.props.onSelectChoice(this.props.choice);
  },

	render: function() {
    var src = this.props.choice.image
      , gender = Store.getAnswers()[0];
    if(gender && !src) src = this.props.choice[gender+'_image']

		return (
      <div onClick={this.handleClick}>
        <img src={src} />
        <div className="button">{this.props.choice.title}</div>
      </div>
		);
	}

});


module.exports = MultipleChoiceQuestionChoice;
