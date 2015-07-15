'use strict';

var React = require('react');
var request = require('superagent');
var Header = require('./components/header.jsx');

var App = React.createClass({
  render: function() {
    return (
      <Header/>
    );
  }
});

React.render(<App/>, document.body);
