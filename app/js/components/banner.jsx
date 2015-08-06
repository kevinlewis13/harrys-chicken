'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    var partner = this.props.bannerInfo.partner;
    var partnerUrl = this.props.bannerInfo.partnerUrl;

    return (
      <article className="slab banner">
        <span id="top" className="clear-header"></span>
        <section className="content banner">
          <h3>We're partnered with {partner}!</h3>
          <Link className="button" to={partnerUrl}>Check out our sister site!</Link>
        </section>
      </article>
    );
  }
});
