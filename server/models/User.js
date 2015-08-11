'use strict';

var mongoose = require('mongoose');
var eat = require('eat');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: {
      type: String,
      unique: true
    },
    password: String
  }
});

userSchema.methods.generateSalt = function() {
  bcrypt.genSalt(8, function(err, salt) {
    if (err) {
      console.log(err);
    }

    return salt;
  });
};

userSchema.methods.generateHash = function(password, salt, callback) {
  bcrypt.hash(password, salt, null, function(err, hash) {
    return callback(err, hash);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    return callback(err, res);
  });
};

module.exports = mongoose.model('User', userSchema);
