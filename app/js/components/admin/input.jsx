'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { value: this.props.value };
  },

  handleChange: function(evt) {
    this.setState({value: evt.target.value});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({value: nextProps.value});
  },

  render: function() {
    var type = this.props.type || 'text';

    return (
      <label>{this.props.labelName}
        <input required={this.props.isRequired} name={this.props.name} type={type}
          placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange}></input>
      </label>
    );
  }
});
