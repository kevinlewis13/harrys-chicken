'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <footer>
        <a className="social facebook" href={this.props.details.facebookUrl} target="_blank">Follow us on Facebook</a>
        <a className="social tumblr" href={this.props.details.tumblrUrl} target="_blank">Follow us on Tumblr</a>
      </footer>
    );
  }
});
