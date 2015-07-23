var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="slab header">
        <h1>Harry's Chicken Joint</h1>
        <nav className="nav">
          <a href="#location">Location</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="tel:+2069389000">206.938.9000</a>
        </nav>
      </header>
    );
  }
});
