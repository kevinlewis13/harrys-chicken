'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var facebookUrl = this.props.socialInfo.facebookUrl;
    var tumblrUrl = this.props.socialInfo.tumblrUrl;

    return { facebookUrl: facebookUrl, tumblrUrl: tumblrUrl };
  },

  render: function() {
    return (
      <footer className="slab footer">
        <a className="social icon-facebook2" href={this.state.facebookUrl} target="_blank"></a>
        <a className="social icon-tumblr2" href={this.state.tumblrUrl} target="_blank"></a>
      </footer>
    );
  }
});
