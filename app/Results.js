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
    return (
      <div className="results">
        <h1>Find your Fitplan</h1>
        <p>Complete fitness plans from the industry's best experts. Every plan includes workouts, nutrition information, supplement advice, and more. Whatever your goal, we've got your guide.</p>


        <h3>Top Plan For You</h3>
        <div className="topPlan">
          {this.renderPlan(this.state.topPlan)}
        </div>

        <h4>Other Recommended Plans</h4>
        <div className="recommendedPlans">
          {this.state.recommendedPlans.map(this.renderPlan)}
        </div>


      </div>
    );
	}
});


module.exports = Results;


