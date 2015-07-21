'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/harrys_chicken_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');

chai.use(chaihttp);

describe('API route tests', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get an array of dishes', function(done) {
    chai.request('localhost:3000')
      .get('/api/menu')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a new dish', function(done) {
    var testDish = {
      title: 'test', description: 'a test dish', price: 4, category: 'test'
    };

    chai.request('localhost:3000')
      .post('/api/dish')
      .send(testDish)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.title).to.eql('test');
        expect(res.body.description).to.eql('a test dish');
        expect(res.body.price).to.eql(4);
        expect(res.body.category).to.eql('test');
        done();
      });
  });
});
