'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './post.routes';

export class PostComponent {
  /*@ngInject*/

  allposts=[];
  newpost=[];
  $http;
  applications=[];

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.CurrentUser = Auth.getCurrentUserSync;
    this.i=0;
    this.curr_usr_id=this.CurrentUser()._id;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('post');
    });
  }
  $onInit() {

    this.$http.get(`/api/posts`)
      .then(response => {
        this.allposts = response.data;
        this.socket.syncUpdates('post', this.allposts);

      });
    
    this.user=this.CurrentUser();
    console.log(this.user._id);
    console.log(curr_usr_id);
    console.log("log of");
    
    this.$http.get(`/api/userposts/post/${this.user._id}`)
      .then(response => {
        this.applications= response.data;
        this.socket.syncUpdates('userpost',this.applications);
        console.log(this.applications);
        console.log("app done");

        for( this.i=0; i<this.applications.length;this.i++)
          {
            this.index= allposts.findIndex(x => x._id === this.applications[this.i].postid);
            console.log(this.index);
            if(this.index>=0)
              { 
                this.allposts[this.index].apply=true;
                this.allposts[this.index].selected=this.applications[this.i].status;
              }
          }

      });
      console.log("inside onInit");
    
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
      window.location.reload()
    }
  }
EditPost(index){
  // this.reset();
  this.post=this.allposts[index];
  this.post.edit=true;
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
  Apply(index){
    this.post=this.allposts[index];
    this.user=this.CurrentUser();
    this.allposts[index].apply=true;
    console.log(this.user);
    this.$http.post(`/api/userposts`,{
      userid:this.user._id,
      postid:this.post._id
    });
    this.$http.get(`/api/userposts/user/${this.post._id}`).then(response=> {console.log(response)});
  }

}

export default angular.module('yoApp.post', [uiRouter])
  .config(routes)
  .component('post', {
    template: require('./post.html'),
    controller: PostComponent

  })
  .name;
