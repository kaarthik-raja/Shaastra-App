'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newUserpost;

describe('Userpost API:', function() {
  describe('GET /api/userposts', function() {
    var userposts;

    beforeEach(function(done) {
      request(app)
        .get('/api/userposts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userposts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(userposts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/userposts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/userposts')
        .send({
          name: 'New Userpost',
          info: 'This is the brand new userpost!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUserpost = res.body;
          done();
        });
    });

    it('should respond with the newly created userpost', function() {
      expect(newUserpost.name).to.equal('New Userpost');
      expect(newUserpost.info).to.equal('This is the brand new userpost!!!');
    });
  });

  describe('GET /api/userposts/:id', function() {
    var userpost;

    beforeEach(function(done) {
      request(app)
        .get(`/api/userposts/${newUserpost._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userpost = res.body;
          done();
        });
    });

    afterEach(function() {
      userpost = {};
    });

    it('should respond with the requested userpost', function() {
      expect(userpost.name).to.equal('New Userpost');
      expect(userpost.info).to.equal('This is the brand new userpost!!!');
    });
  });

  describe('PUT /api/userposts/:id', function() {
    var updatedUserpost;

    beforeEach(function(done) {
      request(app)
        .put(`/api/userposts/${newUserpost._id}`)
        .send({
          name: 'Updated Userpost',
          info: 'This is the updated userpost!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUserpost = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserpost = {};
    });

    it('should respond with the updated userpost', function() {
      expect(updatedUserpost.name).to.equal('Updated Userpost');
      expect(updatedUserpost.info).to.equal('This is the updated userpost!!!');
    });

    it('should respond with the updated userpost on a subsequent GET', function(done) {
      request(app)
        .get(`/api/userposts/${newUserpost._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let userpost = res.body;

          expect(userpost.name).to.equal('Updated Userpost');
          expect(userpost.info).to.equal('This is the updated userpost!!!');

          done();
        });
    });
  });

  describe('PATCH /api/userposts/:id', function() {
    var patchedUserpost;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/userposts/${newUserpost._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Userpost' },
          { op: 'replace', path: '/info', value: 'This is the patched userpost!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUserpost = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUserpost = {};
    });

    it('should respond with the patched userpost', function() {
      expect(patchedUserpost.name).to.equal('Patched Userpost');
      expect(patchedUserpost.info).to.equal('This is the patched userpost!!!');
    });
  });

  describe('DELETE /api/userposts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/userposts/${newUserpost._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userpost does not exist', function(done) {
      request(app)
        .delete(`/api/userposts/${newUserpost._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
