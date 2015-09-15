'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { selected: this.props.default };
  },

  renderOptions: function() {
    return _.map(this.props.options, function(option) {
      return (
        <option key={option.value} value={option.value}>{option.display}</option>
      );
    });
  },

  handleChange: function(evt) {
    this.setState({selected: evt.target.value});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({selected: nextProps.default});
  },

  render: function() {
    return (
      <select name={this.props.name} value={this.state.selected} onChange={this.handleChange}>
        {this.renderOptions()}
      </select>
    );
  }
});
