'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { value: this.props.default };
  },

  handleChange: function(evt) {
    this.setState({value: evt.target.value});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({value: nextProps.default});
  },

  render: function() {
    return (
      <label className="textarea-label">{this.props.labelName}
        <textarea required={this.props.isRequired} name={this.props.name}
          value={this.state.value} placeholder={this.props.placeholderText}
          rows={this.props.rows} cols={this.props.cols} onChange={this.handleChange}/>
      </label>
    );
  }
});
