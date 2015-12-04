var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var ProgressBar = React.createClass({

	render: function() {
		return (
      <span>{this.props.currentQuestion+1} / {this.props.totalQuestions}</span>
		);
	}

});




module.exports = ProgressBar;
