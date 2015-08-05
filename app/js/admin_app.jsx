'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/form.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { menu: [] };
  },

  componentDidMount: function() {
    this.loadMenu();
  },

  loadMenu: function() {
    request
      .get('/api/menu')
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.setState({menu: res.body});
      }.bind(this));
  },

  deleteItem: function(item) {
    request
      .del('/api/dish/' + item)
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
      }.bind(this));
  },

  addItem: function(item) {
    request
      .post('/api/dish')
      .send(item)
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
      }.bind(this));
  },


  render: function() {
    return (
      <Admin menu={this.state.menu} add={this.addItem} delete={this.deleteItem}/>
    );
  }
});
