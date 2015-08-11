'use strict';

var React = require('react');
var cookie = require('react-cookie');
var _ = require('lodash');

module.exports = React.createClass({
  onClickHandler: function(e) {
    e.preventDefault();

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

        cookie.save('eat', res.token);

        console.log(cookie.load('eat'));
      });
  },

  render: function() {
    return (
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" ref="email" placeholder="Email"/>
        <label htmlFor="password">Password</label>
        <input type="password" ref="password" placeholder="Password"/>
        <button type="submit" onClick={this.onClickHandler}>Sign In</button>
      </form>
    );
  }
});
