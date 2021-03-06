'use strict';

import post from './post.component';
import {
  PostComponent } from './post.component';

describe('Component: PostComponent', function() {
  beforeEach(angular.mock.module(post));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var postComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/posts')
      .respond(['ceo', 'manager', 'Soft dev', 'coord']);

    scope = $rootScope.$new();
    state = $state;
    postComponent = $componentController('post', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of things to the controller', function() {
    postComponent.$onInit();
    $httpBackend.flush();
    expect(postComponent.allposts.length)
      .to.equal(4);
  });
});
