var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li>
        <p>{this.props.dish.title}</p>
        <p>{this.props.dish.description}</p>
        <p>${this.props.dish.price}</p>
      </li>
    );
  }
});
