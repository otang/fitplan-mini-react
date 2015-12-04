var React = require('react');


var ProgressBar = React.createClass({

	render: function() {
		return (
      <span>{this.props.currentQuestion+1} / {this.props.totalQuestions}</span>
		);
	}

});




module.exports = ProgressBar;
