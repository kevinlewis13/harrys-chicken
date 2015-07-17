'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');
var Info = require('./components/info.jsx');

var App = React.createClass({
  getInitialState: function() {
    var chickenDetails = {name: 'Harry\'s Chicken Joint', phone: '206.938.9000', address: '6032 California Ave SW, Seattle, WA 98136', hours: 'Tuesday - Saturday, 4-8pm'};
    return {details: chickenDetails};
  },
  render: function() {

    return (
      <main>
        <Header />
        <Info details={this.state.details}/>
      </main>
    );
  }
});

React.render(<App/>, document.body);
