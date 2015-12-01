'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Menu = require('./menu.jsx');

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
          <h3>"Smoked and skillet-fried."</h3>
        </section>
      </article>
    );
  }
    // leaving the empty h3 in for spacing purposes, until a slogan is decided upon.
    if (path === '/coffee') {
      return (
        <article className={bannerClass}>
          <span id="top" className="clear-header"></span>
          <section className="content banner">
            <h3></h3>
            <Menu menu={this.props.menu} categories={this.props.bannerInfo.category} />
          </section>
        </article>
      );
  }
  }
});
