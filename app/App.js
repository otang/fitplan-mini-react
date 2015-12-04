var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var Questionnaire = require('./Questionnaire.js');



var App = React.createClass({
  getInitialState: function () {
    return {
      page: Store.getPage()
    };
  },
  componentWillMount: function () {
    Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function () {
    Store.removeChangeListener(this.changeState);
  },
  changeState: function () {
    this.setState({
      page: Store.getPage()
    });
  },

	render: function() {
    switch(Store.getPage()) {
      case "questionnaire":
        return (
          <Questionnaire></Questionnaire>
        );
        break;
      default:
        return (
          <h1>Thnkx</h1>
        );
    }
	}

});




module.exports = App;
