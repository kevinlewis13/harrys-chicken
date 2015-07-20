'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');
var Info = require('./components/info.jsx');

var App = React.createClass({
  getInitialState: function() {
    var chickenDetails = {name: 'Harry\'s Chicken Joint', phone: '206.938.9000', address: '6032 California Ave SW, Seattle, WA 98136', hours: 'Tuesday - Saturday, 4-8pm'};

    return {menu: [], details: chickenDetails};
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
        <Info details={this.state.details} menu={this.state.menu} loadMenu={this.loadMenu}/>
      </main>
    );
  }
});

React.render(<App/>, document.body);
