'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    var facebookUrl = this.props.socialInfo.facebookUrl;
    var tumblrUrl = this.props.socialInfo.tumblrUrl;

    return (
      <article className="slab footer">
        <footer className="content footer">
          <a className="social icon-facebook2" href={facebookUrl} target="_blank"></a>
          <a className="social icon-tumblr2" href={tumblrUrl} target="_blank"></a>
          <p className="copy">&copy; 2015 Harry's Chicken Joint, LLC</p>
          <Link className="small_text" to={'/admin/sign_in'}>Admin</Link>
        </footer>
      </article>
    );
  }
});
