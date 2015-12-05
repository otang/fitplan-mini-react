var React = require('react');


var ProgressBar = React.createClass({

	render: function() {
		return (
      <div className="progressBar">{this.props.currentQuestion+1} / {this.props.totalQuestions}</div>
		);
	}

});




module.exports = ProgressBar;
