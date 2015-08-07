'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var menuRoutes = express.Router();
var authRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/harrys_chicken_dev');

require('./routes/menu_routes')(menuRoutes);
require('./routes/auth_routes')(authRoutes);

app.use('/api/menu', menuRoutes);
app.use('/api/dish', authRoutes);

app.use(express.static(__dirname + '/../build'));

app.all('*', function(req, res) {
  res.status(404).json({msg: 'page not found'});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
