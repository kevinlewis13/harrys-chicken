'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      console.log('unauthorized, no token in request');
      return res.status(401).json({msg: 'not authorized, no token in request'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'not authorized, could not decode'});
      }

      User.findOne({ _id: decoded.id }, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(401).json({msg: 'not authorized, error finding user'});
        }

        if (!user) {
          console.log('could not find user for that token');
          return res.status(401).json({msg: 'not authorized, could not find that user'});

        }

        req.user = user;
        next();
      });
    });
  };
};
