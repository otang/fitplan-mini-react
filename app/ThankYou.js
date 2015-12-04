
var React = require('react');


var ThankYou = React.createClass({

	render: function() {
    return (
      <div className="thankYou">
        <h1>You're done!</h1>
        <p>
          <a href="#">Connect with Facebook</a> now to see your personalized results.
        </p>
      </div>
    );
	}
});


module.exports = ThankYou;
