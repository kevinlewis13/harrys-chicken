'use strict';

var bodyparser = require('body-parser');
var Dish = require('../models/Dish');

// routes will eventually require authentication
module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/', function(req, res) {
    var newDish = new Dish(req.body);

    newDish.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: '500 Internal server error'});
      }

      res.json(data);
    });
  });
};
