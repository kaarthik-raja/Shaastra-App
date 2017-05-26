'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var userpostCtrlStub = {
  index: 'userpostCtrl.index',
  show: 'userpostCtrl.show',
  create: 'userpostCtrl.create',
  upsert: 'userpostCtrl.upsert',
  patch: 'userpostCtrl.patch',
  destroy: 'userpostCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userpostIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './userpost.controller': userpostCtrlStub
});

describe('Userpost API Router:', function() {
  it('should return an express router instance', function() {
    expect(userpostIndex).to.equal(routerStub);
  });

  describe('GET /api/userposts', function() {
    it('should route to userpost.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'userpostCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/userposts/:id', function() {
    it('should route to userpost.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'userpostCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/userposts', function() {
    it('should route to userpost.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userpostCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/userposts/:id', function() {
    it('should route to userpost.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'userpostCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/userposts/:id', function() {
    it('should route to userpost.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'userpostCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/userposts/:id', function() {
    it('should route to userpost.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'userpostCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
