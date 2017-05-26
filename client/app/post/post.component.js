'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './post.routes';

export class PostComponent {
  /*@ngInject*/
  allposts=[];
  newpost=[];
  $http;
  socket;
  constructor($http, $scope, socket,Auth) {
    this.$http = $http;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('post');
    });
  }
  $onInit() {
    this.$http.get('/api/posts')
      .then(response => {
        this.allposts = response.data;
        this.socket.syncUpdates('post', this.allposts);
      });
  }
  reset(){
    this.$http.get('/api/posts')
      .then(response => {
        this.allposts = response.data;
        this.socket.syncUpdates('post', this.allposts);
      });
  }
  addPost() {
    if(this.newpost) {
      this.$http.post('/api/posts', {
        name: this.newpost.name,
        info:"hi"

      });
      this.newpost = "";
    }
  }

  deletePost(post) {
    this.$http.delete(`/api/posts/${post._id}`);
  }
}

export default angular.module('yoApp.post', [uiRouter])
  .config(routes)
  .component('post', {
    template: require('./post.html'),
    controller: PostComponent

  })
  .name;
