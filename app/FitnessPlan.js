
var React = require('react');


var FitnessPlan = React.createClass({

	render: function() {
    return (
      <div className="plan">
        <h3>{this.props.plan.title}</h3>
        <img src={this.props.plan.author.avatar} />
        <p className="author">By {this.props.plan.author.name}</p>
        <p className="overview">{this.props.plan.overview}</p>
      </div>
    );
	}
});


module.exports = FitnessPlan;
