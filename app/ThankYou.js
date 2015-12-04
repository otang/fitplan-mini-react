
var React = require('react');

// import React from 'react';
// import ReactDOM from 'react-dom';
var FacebookLogin =  require('react-facebook-login');



var ThankYou = React.createClass({
  getInitialState: function() {
    return { user: null};
  },

  responseFacebook: function(response) {
    if(response.status && response.status == 'not_authorized') return;

    //{id: "10153261461248870", birthday: "05/10/1986", email: "dr.greenwood@gmail.com", first_name: "Chris", gender: "male"…}
    this.setState({user: response});
    this.props.onLoginComplete(response);
  },

  viewResultsClicked: function(e) {
    e.preventDefault();
    this.props.onProceedToResults();
  },

	render: function() {

    return (
      <div className="thankYou">
        <h1>You're done!</h1>
        <div style={{display: this.state.user ? 'none' : ''}}>
          <p>
            Connect with Facebook now to view your top Fitplan.
          </p>
          <FacebookLogin
            appId="366102180203274"
            autoLoad={true}
            callback={this.responseFacebook}
            scope="public_profile, email"
            textButton="Connect with Facebook"
            />
        </div>

        <div style={{display: this.state.user ? '' : 'none'}}>
          <a href onClick={this.viewResultsClicked}>View Your Results Now</a>
        </div>
      </div>
    );
	}
});


module.exports = ThankYou;
