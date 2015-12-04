
var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');


var NumberQuestion = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onAnswerQuestion(this.state.value);
  },

  handleValueChange: function(e) {
    this.setState({value: e.target.value});
  },

	render: function() {
		return (
      <div className="question">
        <h3>{this.props.question.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <input name="number" onChange={this.handleValueChange} value={this.state.value} />
          <input type="submit" value="Next" />
        </form>
      </div>
		);
	}
});


module.exports = NumberQuestion;
