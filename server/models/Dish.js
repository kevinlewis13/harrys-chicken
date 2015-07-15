'use strict';

var mongoose = require('mongoose');

var dishSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { type: String, required: true }
});

module.exports = mongoose.model('Dish', dishSchema);
