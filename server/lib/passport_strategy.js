'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({'basic.email' : email}, function(err, user) {
      if (err) return done('database error finding user');

      if (!user) return done('wrong username or password');

      user.checkPassword(password, function (err, res) {
        if (err) return done('database error checking password');

        if (!res) {
          return done('wrong password or username');
        } else {
          return done(null, user);
        }
      });
    });
  }));
};
