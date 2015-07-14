'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/harrys_chicken_dev');

app.get('/api/menu', function(req, res) {
  res.status(200).json({msg: 'GET request received'});
});

app.all('*', function(req, res) {
  res.status(404).json({msg: '404 Page not found'});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
