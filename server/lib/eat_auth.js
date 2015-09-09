'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      return res.status(401).json({msg: '401 Not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: '401 Not authorized'});
      }

      User.findOne({ _id: decoded.id }, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: '500 Internal server error'});
        }

        if (!user) {
          return res.status(401).json({msg: '401 Not authorized'});

        }

        req.user = user;
        next();
      });
    });
  };
};
