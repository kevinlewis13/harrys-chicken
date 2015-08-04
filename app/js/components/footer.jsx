'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var facebookUrl = this.props.socialInfo.facebookUrl;
    var tumblrUrl = this.props.socialInfo.tumblrUrl;

    return (
      <article className="slab footer">
        <footer className="content footer">
          <a className="social icon-facebook2" href={facebookUrl} target="_blank"></a>
          <a className="social icon-tumblr2" href={tumblrUrl} target="_blank"></a>
        </footer>
      </article>
    );
  }
});
