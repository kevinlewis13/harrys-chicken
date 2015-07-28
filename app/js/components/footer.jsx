'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <footer className="slab footer">
        <a className="social icon-facebook2" href={this.props.details.facebookUrl} target="_blank"></a>
        <a className="social icon-tumblr2" href={this.props.details.tumblrUrl} target="_blank"></a>
      </footer>
    );
  }
});
