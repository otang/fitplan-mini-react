var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var Questionnaire = require('./Questionnaire.js');
var ThankYou = require('./ThankYou.js');
var Results = require('./Results.js');



var App = React.createClass({
  getInitialState: function () {
    return {
      // page: "questionnaire"
      // page: "thank_you"
      page: "results"
    };
  },

  handleSurveyComplete: function() {

    console.log('thanks for completing the survey!');
    console.log(Store.getAnswers());
    this.setState({page: 'thank_you'});
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
          <ThankYou></ThankYou>
        );
        break;
      case "results":
        return (
          <Results></Results>
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
