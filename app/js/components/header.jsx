'use strict';

var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    var phoneLink = 'tel:+' + this.props.phone.split('.').join('');
    return { phoneLink: phoneLink };
  },

  render: function() {
    return (
      <div className="header-container">
        <header className="content header">
          <h1>Harry's Chicken Joint</h1>
          <nav className="nav">
            <a href="#location">Location</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href={this.state.phoneLink}>{this.props.phone}</a>
          </nav>
        </header>
      </div>
    );
  }
});
