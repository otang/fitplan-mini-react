var React = require('react');






var ProgressBar = React.createClass({
  renderSegment: function (index) {
    var className = index <= this.props.currentQuestion ? 'complete' : '';
    return (
      <li className={className} key={index}></li>
    );
  },

	render: function() {
    var segments = [];
    for(var i = 0; i < this.props.totalQuestions; i++) {
      segments.push(this.renderSegment(i));
    }
    return (
       <ul className="progressBar">{segments}</ul>
    );
	}

});




module.exports = ProgressBar;
