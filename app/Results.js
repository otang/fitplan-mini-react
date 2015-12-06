var React = require('react');
var FitnessPlan = require('./FitnessPlan.js');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Randomize the plans
var plans = shuffle(require('./plans.json'));


var Results = React.createClass({
  getInitialState: function () {
    var topPlan = plans.shift();
    return {
      topPlan: topPlan,
      recommendedPlans: plans
    };
  },

  renderPlan: function(plan, index) {
    return (
      <FitnessPlan key={index} plan={plan}></FitnessPlan>
    );
  },

	render: function() {
    console.log(this.props.user);
    return (
      <div className="contentWrapper">
        <div className="results">
          <h1>{this.props.user && this.props.user.name ? this.props.user.name+', ' : ''}Here are Your Results</h1>


          <h2>Top Plan For You</h2>
          <div className="topPlan">
            {this.renderPlan(this.state.topPlan)}
          </div>

          <h2>Other Recommended Plans</h2>
          <div className="recommendedPlans">
            {this.state.recommendedPlans.map(this.renderPlan)}
          </div>
        </div>
      </div>
    );
	}
});


module.exports = Results;


