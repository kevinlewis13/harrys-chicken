'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/form.jsx');
var cookie = require('react-cookie');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return { menu: [] };
  },

  componentWillMount: function() {
    var token = cookie.load('eat');

    if (!token) {
      this.transitionTo('/admin/sign_in');
    }
  },

  logout: function() {
    cookie.remove('eat');
    this.transitionTo('/');
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

  deleteItem: function(id) {
    request
      .del('/api/dish/' + id)
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

  editItem: function(id, item) {
    request
      .put('/api/dish/' + id)
      .send(item)
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
      }.bind(this));
  },


  render: function() {
    console.log(this.state.token);

    return (
      <section>
        <a href="/">Home</a>
        <a onClick={this.logout}>Logout</a>
        <Admin menu={this.state.menu} add={this.addItem} delete={this.deleteItem} edit={this.editItem}/>
      </section>
    );
  }
});
