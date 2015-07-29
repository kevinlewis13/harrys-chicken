'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section id="about">
        <h3>About Us</h3>
        <p>Some hardcoded text explaining why were cool</p>
        <p>Or should this be a props thing passed down from the top level? </p>
        <p>Maybe we should have two collections in the data base...but that would be harder for people to change I think.</p>
      </section>
    );
  }
});
