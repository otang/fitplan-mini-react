
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var HeightQuestion = React.createClass({
  getInitialState: function () {
    var state = {
      height: this.props.value,
      feet: null,
      inches: null
    }

    // ie. 6'10"
    if(state.height && typeof state.height === 'string') {
      console.log('Height value is '+state.height);
      var matches = state.height.match(/(\d+)/g);
      if(matches && matches.length == 2) {
        state.feet = matches[0];
        state.inches = matches[1];
      }
    }

    return state;
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var height = this.state.feet+"' "+this.state.inches+'"';
    this.props.onAnswerQuestion(height);
  },

  handleFeetChange: function(e) {
    this.setState({feet: e.target.value});
  },
  handleInchesChange: function(e) {
    this.setState({inches: e.target.value});
  },

	render: function() {
		return (
      <div className="question">
        <h3>{this.props.question.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="feet" onChange={this.handleFeetChange} value={this.state.feet} />
          <input name="inches" onChange={this.handleInchesChange} value={this.state.inches} />
          <input type="submit" value="Next" />
        </form>
      </div>
		);
	}
});


module.exports = HeightQuestion;
