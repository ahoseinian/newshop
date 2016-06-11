var utils = require('../utils');
var server = require('supertest')(require('../../app'));
var should = require('should');
var Category = require('../../lib/back/models/category');

describe('admin categories', function() {
  var base = '/admin/categories';

  describe('GET /', function() {

    it('is working fine', function(done) {
      server
        .get(base)
        .expect(function(res) {
          res.text.should.match(/Categories Admin Page/);
        })
        .expect(200, done);
    });

  });

  describe('POST /', function() {

    it('adds new categories', function(done) {
      server
        .post(base)
        .send({ name: 'test' })
        .end(function(err, res) {
          should.not.exists(err);
          res.status.should.be.equal(302); //make sure it is a redirect
          Category.count(function(err, count) { //category model should be saved
            if (err) throw err;
            count.should.be.equal(1);
            done();
          });
        });
    });

  });
});
