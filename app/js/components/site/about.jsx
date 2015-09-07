'use strict';

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  mixins: [Router.State],

  render: function() {
    var path = this.getPathname();

    if (path === '/chicken') {
      return (
        <article className="slab about">
          <section className="content chicken about">
            <span id="about" className="clear-header"></span>
            <h3>About Us</h3>
            <p>This is the about for the chicken page. It will talk about how awesome the chicken is.</p>
          </section>
        </article>
      );
    }

    if (path === '/coffee') {
      return (
        <article className="slab about">
          <section className="content coffee about">
            <span id="about" className="clear-header"></span>
            <h3>About Us</h3>
            <p>This is the about for the coffee page. It will talk about how good the coffee is.</p>
          </section>
        </article>
      );
    }
  }
});
