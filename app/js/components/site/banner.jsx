'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [Router.State],

  render: function() {
    var path = this.getPathname();
    var partner = this.props.bannerInfo.partner;
    var partnerUrl = this.props.bannerInfo.partnerUrl;
    var bannerClass = path === '/chicken' ? ' slab banner chicken' : 'slab banner coffee';
    if (path === '/chicken') {
    return (
      <article className={bannerClass}>
        <span id="top" className="clear-header"></span>
        <section className="content banner">
          <h3>Smoked and skillet-fried</h3>
          <Link className="button-link" to={partnerUrl}>We also are now serving coffee in the mornings! Check it out!</Link>
        </section>
      </article>
    );
  }
    if (path === '/coffee') {
      return (
        <article className={bannerClass}>
          <span id="top" className="clear-header"></span>
          <section className="content banner">
            <h3></h3>
            <Link className="button-link" to={partnerUrl}>We also are now serving coffee in the mornings! Check it out!</Link>
          </section>
        </article>
      );
  }
  }
});
