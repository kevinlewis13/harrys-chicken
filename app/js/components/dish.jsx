'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li className="dish">
        <p className="title">{this.props.dish.title}</p>
        <p className="description">{this.props.dish.description}</p>
        <p className="price">{this.props.dish.price}</p>
      </li>
    );
  }
});
