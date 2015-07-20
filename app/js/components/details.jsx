'use strict';

var React = require('react');
var Menu = require('./menu.jsx')

module.exports = React.createClass({
  render: function() {
    return (
      <section>
        <p>Phone: {this.props.details.phone}</p>
        <p>Address: {this.props.details.address}</p>
        <p>Hours: {this.props.details.hours}</p>
        <a>Our Menu:<Menu menu={this.props.menu} /></a>
      </section>
    );
  }
});
