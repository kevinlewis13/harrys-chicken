'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/', function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));

    delete newUserData.password;
    delete newUserData.email;

    var newUser = new User(newUserData);
    newUser.basic.email = req.body.email;
    newUser.generateHash(req.body.password, newUser.generateSalt(), function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not generate hash'});
      }

      newUser.basic.password = hash;
    });

    newUser.save(function (err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not save user'});
      }

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          console.log(err);
          res.status(500).json({msg: 'could not generate token to save'});
        }

        res.json({token: token});
      });
    });
  });

  router.get('/', passport.authenticate('basic', {session: false}), function (req, res) {

    req.user.generateToken(process.env.APP_SECRET, function (err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'could not generate token to use'});
      }

      res.json({token: token});
    });
  });
};
