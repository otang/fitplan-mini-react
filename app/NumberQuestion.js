
var React = require('react');


var NumberQuestion = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if( !this.state.value) return;
    this.props.onAnswerQuestion(this.state.value);
  },

  handleValueChange: function(e) {
    this.setState({value: e.target.value});
  },

	render: function() {
		return (
      <div className="question numberQuestion">
        <h3>{this.props.question.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <input className="number" name="number" onChange={this.handleValueChange} value={this.state.value} />
          <label for="number">{this.props.question.label}</label>
          <input className="button"  type="submit" value="Continue" />
        </form>
      </div>
		);
	}
});


module.exports = NumberQuestion;
