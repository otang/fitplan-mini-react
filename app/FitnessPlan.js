
var React = require('react');


var FitnessPlan = React.createClass({

	render: function() {
    return (
      <div className="plan">
        {this.props.plan.title}
      </div>
    );
	}
});


module.exports = FitnessPlan;
