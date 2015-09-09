'use strict';

var React = require('react');
var request = require('superagent');
var Admin = require('./components/admin/form.jsx');
var cookie = require('react-cookie');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      menu: [],
      categoryOptions: [
        {value: 'entrees', name: 'Entree'},
        {value: 'sides', name: 'Side'},
        {value: 'sauces', name: 'Sauce'},
        {value: 'drinks', name: 'Drink'},
        {value: 'beverages', name: 'Beverage'},
        {value: 'pastries', name: 'Pastry'},
        {value: 'extras', name: 'Extra'}
      ],
      restaurantOptions: [
        {value: 'chicken', name: 'Chicken Joint'},
        {value: 'coffee', name: 'Coffee Joint'}
      ]
    };
  },

  componentWillMount: function() {
    var token = cookie.load('eat');

    if (!token) {
      this.transitionTo('/admin/sign_in');
    }
  },

  logout: function(evt) {
    evt.preventDefault();

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
      .set('eat', cookie.load('eat'))
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
      .set('eat', cookie.load('eat'))
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
      .set('eat', cookie.load('eat'))
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        this.loadMenu();
      }.bind(this));
  },


  render: function() {
    return (
      <section>
        <a href="/">Home</a>
        <a onClick={this.logout}>Logout</a>
        <Admin menu={this.state.menu} add={this.addItem} delete={this.deleteItem} edit={this.editItem}
          categoryOptions={this.state.categoryOptions} restaurantOptions={this.state.restaurantOptions}/>
      </section>
    );
  }
});
