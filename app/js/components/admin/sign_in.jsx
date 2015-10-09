'use strict';

var React = require('react');
var cookie = require('react-cookie');
var _ = require('lodash');
var request = require('superagent');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  onClickHandler: function(evt) {
    evt.preventDefault();

    var user = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    };

    this.signIn(user);
    this.clearFields(this.refs);
  },

  clearFields: function(fields) {
    var keys = _.keys(fields);

    _.forEach(keys, function(key) {
      React.findDOMNode(fields[key]).value = '';
    });
  },

  signIn: function(user) {
    request
      .get('/api/users')
      .auth(user.email, user.password)
      .end(function(err, res) {
        if (err) {
          return console.log(err);
        }

        cookie.save('eat', res.body.token);
        this.transitionTo('/admin');
      }.bind(this));
  },

  componentWillMount: function() {
    var token = cookie.load('eat');

    if(token) {
      this.transitonTo('/admin');
    }
  },

  render: function() {
    return (
      <section className="sign-in">
        <form className="form-visible">
          <label htmlFor="email">Email</label>
          <input type="email" ref="email" placeholder="you@example.com"/>
          <label htmlFor="password">Password</label>
          <input type="password" ref="password" placeholder="supersecret"/>
          <button type="submit" onClick={this.onClickHandler}>Sign In</button>
          <h4>Not an admin of this site?</h4>
          <p>Take me back <a href="/">HOME</a></p>
        </form>
      </section>
    );
  }
});
