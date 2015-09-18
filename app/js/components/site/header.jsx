'use strict';

var React = require('react');
var $ = require('jquery');
var Router = require('react-router');

module.exports = React.createClass({
  mixins: [Router.State],

  handleClick: function(id) {
    $('body')
      .animate({ scrollTop: $(id).offset().top }, 800);
  },

  render: function() {
    var path = this.getPathname();
    var name = this.props.headerInfo.name;
    var phone = this.props.headerInfo.phone;
    var phoneLink = 'tel:+' + phone.split('.').join('');
    var headerClass = path === '/chicken' ? ' header-container chicken' : 'header-container coffee';

    return (
      <div className={headerClass}>
        <header className="content header">
          <a onClick={this.handleClick.bind(null, '#top')}><h1>{name}</h1></a>
          <nav>
            <a onClick={this.handleClick.bind(null, '#location')}>Location</a>
            <a onClick={this.handleClick.bind(null, '#menu')}>Menu</a>
            <a onClick={this.handleClick.bind(null, '#about')}>About</a>
            <a className="button-link" href={phoneLink}>{phone}</a>
          </nav>
        </header>
      </div>
    );
  }
});
