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

  router.delete('/:id', function(req, res) {
    Dish.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: '500 Internal server error'});
      }

      res.json({msg: 'deleted successfully'});
    });
  });

  router.put('/:id', function(req, res) {
    var updatedDish = req.body;
    delete updatedDish._id;
    Dish.update({'_id': req.params.id}, updatedDish, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: '500 Internal server error'});
      }

      res.json({msg: 'updated successfully'});
    });
  });
};
