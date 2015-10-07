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
            <p>Our whole and half chickens come locally sourced from Mad Hatcher Farms in Ephrata, WA.  They are cage free and all natural.</p>
            <p>We specify a young, small bird, less than 2 3/4 pounds and cut them into 12 pieces.</p>
            <p>All our chicken is marinated in buttermilk, then double-dredged in our flour and spice mix. A gentle smoke over Apple hardwood and then it's off to fry in canola oil in our huge, cast-iron kettles.</p>
            <p>We hope you enjoy. Let us know.</p>
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
            <p>Harry's Coffee Joint is operated by Catherine and Jared, two kids who love making coffee as much as they love drinking it.</p>
            <p>We  proudly serve an espresso blend roasted by Vashon Coffee Company (link) prepared on a Slayer (link) machine, as well as a rotating selection of their single origin coffees for brewed coffee.  On top of that, we roast our own beans in house available as pour over and cold brew.</p>
            <p>stop by and stay a while or get drinks and pastries to go.</p>
          </section>
        </article>
      );
    }
  }
});
