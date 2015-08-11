'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
var menuRoutes = express.Router();
var authRoutes = express.Router();
var userRoutes = express.Router();

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangethis';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/harrys_chicken_dev');

app.use(passport.initialize());
require('./lib/passport_strategy')(passport);


require('./routes/menu_routes')(menuRoutes);
require('./routes/auth_routes')(authRoutes);
require('./routes/user_routes')(userRoutes, passport);


app.use('/api/menu', menuRoutes);
app.use('/api/dish', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(__dirname + '/../build'));

app.all('*', function(req, res) {
  res.status(404).json({msg: 'page not found'});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
