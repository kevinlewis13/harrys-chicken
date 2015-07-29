'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section>
        <h3>We're partnered with {this.props.details.partner}!</h3>
        <a href={this.props.details.parterUrl}>Check out our sister site!</a>
      </section>
    );
  }
});
