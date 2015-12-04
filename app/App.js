var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var Questionnaire = require('./Questionnaire.js');
var ThankYou = require('./ThankYou.js');
var Results = require('./Results.js');



var App = React.createClass({
  getInitialState: function () {
    return {
      user: null,
      page: "questionnaire"
      // page: "thank_you"
    };
  },

  handleSurveyComplete: function() {

    console.log('thanks for completing the survey!');
    console.log(Store.getAnswers());
    this.setState({page: 'thank_you'});
  },

  facebookLoginComplete: function(user) {
    this.setState({user: user});
  },

  proceedToResults: function() {
    this.setState({page: 'results'});
  },

	render: function() {
    switch(this.state.page) {
      case "questionnaire":
        return (
          <Questionnaire onComplete={this.handleSurveyComplete}></Questionnaire>
        );
        break;
      case "thank_you":
        return (
          <ThankYou onLoginComplete={this.facebookLoginComplete} onProceedToResults={this.proceedToResults}></ThankYou>
        );
        break;
      case "results":
        return (
          <Results user={this.state.user}></Results>
        );
        break;
      default:
        return (
          <p>404 Page not found</p>
        );
    }
	}

});



module.exports = App;
