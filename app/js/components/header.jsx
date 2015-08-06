'use strict';

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  handleClick: function(id, evt) {
    $('body')
      .animate({ scrollTop: $(id).offset().top }, 800);
  },

  render: function() {
    var name = this.props.headerInfo.name;
    var phone = this.props.headerInfo.phone;
    var phoneLink = 'tel:+' + phone.split('.').join('');

    return (
      <div className="header-container">
        <header className="content header">
          <a onClick={this.handleClick.bind(null, '#top')}><h1>{name}</h1></a>
          <nav className="nav">
            <a onClick={this.handleClick.bind(null, '#location')}>Location</a>
            <a onClick={this.handleClick.bind(null, '#menu')}>Menu</a>
            <a onClick={this.handleClick.bind(null, '#about')}>About</a>
            <a className="button" href={phoneLink}>{phone}</a>
          </nav>
        </header>
      </div>
    );
  }
});
