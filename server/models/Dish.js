'use strict';

var mongoose = require('mongoose');

var dishSchema = mongoose.Schema({
  restaurant: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  index: {type: Number}
});

module.exports = mongoose.model('Dish', dishSchema);
