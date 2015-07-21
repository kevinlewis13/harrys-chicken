'use strict';

var React = require('react');
var Menu = require('./menu.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {hidden: true};
  },

  showMenu: function() {
    if (!this.props.menu.length) {
      this.props.loadMenu();
    }

    this.setState({hidden: false});
  },

  hideMenu: function() {
    this.setState({hidden: true});
  },

  render: function() {
    var menuClass = (this.state.hidden ? 'hide' : '') + ' menu';

    return (
      <section>
        <p>Phone: {this.props.details.phone}</p>
        <p>Address: {this.props.details.address}</p>
        <p>Hours: {this.props.details.hours}</p>
        <a onClick={this.showMenu}>Our Menu:</a>
        <aside className={menuClass}>
          <a onClick={this.hideMenu}>[x]</a>
          <Menu menu={this.props.menu} />
        </aside>
      </section>
    );
  }
});
