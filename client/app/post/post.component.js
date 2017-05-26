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
    if(this.newpost && this.isAdmin()) {
      this.$http.post('/api/posts', {
        name: this.newpost.name,
        info:this.newpost.info,
        maxapp:this.newpost.maxapp
      });
      this.newpost = "";
      this.reset();
    }
  }
EditPost(index){
      console.log("Blah Blah Blah");
  // this.reset();
  this.post=this.allposts[index];
  this.post.edit=true;
  console.log(post);
}
DeletePost(index) {
    this.post=this.allposts[index];
    this.$http.delete(`/api/posts/${this.post._id}`);
  }
  Cancel(index){
    this.post=this.allposts[index];
    this.post.edit=false;
    this.reset();
  }
  SavePost(post){
    this.$http.put(`/api/posts/${post._id}`, {
        name: post.name,
        info: post.info,
        maxapp: post.maxapp
      }).then((response)=>{this.reset(); });
    
  
  }
}

export default angular.module('yoApp.post', [uiRouter])
  .config(routes)
  .component('post', {
    template: require('./post.html'),
    controller: PostComponent

  })
  .name;
