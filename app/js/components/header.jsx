'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var name = this.props.headerInfo.name;
    var phone = this.props.headerInfo.phone;
    var phoneLink = 'tel:+' + phone.split('.').join('');

    return (
      <div className="header-container">
        <header className="content header">
          <a href="#banner"><h1>{name}</h1></a>
          <nav className="nav">
            <a href="#location">Location</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a className="button" href={phoneLink}>{phone}</a>
          </nav>
        </header>
      </div>
    );
  }
});
