'use strict';

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <label>{this.props.labelName}
        <input required={this.props.isRequired} name={this.props.name} type="text"
          placeholder={this.props.placeholder} defaultValue={this.props.default}></input>
      </label>
    );
  }

});
