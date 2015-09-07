'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  renderOptions: function() {
    return _.map(this.props.options, function(option) {
      return (
        <option key={option.value} value={option.value}>{option.name}</option>
      );
    });
  },

  render: function() {
    return (
      <select name={this.props.name} defaultValue={this.props.default}>
        {this.renderOptions()}
      </select>
    );
  }
});
