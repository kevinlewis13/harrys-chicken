'use strict';

var bodyparser = require('body-parser');
var Dish = require('../models/Dish');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/', function(req, res) {
    Dish.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: '500 Internal server error'});
      }

      res.json(data);
    });
  });
};
