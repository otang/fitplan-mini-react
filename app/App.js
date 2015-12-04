var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var Questionnaire = require('./Questionnaire.js');
var ThankYou = require('./ThankYou.js');



var App = React.createClass({
  getInitialState: function () {
    return {
      page: "questionnaire"
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
      default:
        return (
          <ThankYou></ThankYou>
        );
    }
	}

});



module.exports = App;
