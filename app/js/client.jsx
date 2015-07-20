'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');
var Menu = require('./components/menu.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {menu: []};
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  loadMenu: function() {
    request
      .get('api/menu')
      .end(function(err, res) {
        if (err) return console.log(err);

        this.setState({menu: res.body});
      }.bind(this));
  },

  render: function() {
    return (
      <main>
        <Header/>
        <Menu menu={this.state.menu}/>
      </main>
    );
  }
});

React.render(<App/>, document.body);
