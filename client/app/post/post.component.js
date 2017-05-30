'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './post.routes';

export class PostComponent {
  /*@ngInject*/

  allposts=[];
  newpost=[];
  $http;
  // curruser;
  applications=[];

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.CurrentUser = Auth.getCurrentUserSync;
    this.curruser=this.CurrentUser();
    // this.curruser=this.CurrentUser();
    this.i=0;this.j=0;
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
      // console.log(this.CurrentUser());
    // this.$http.get(`/api/userposts/post/${this.CurrentUser()._id}`)
    //   .then(response => {
    //     this.applications= response.data;
    //     this.socket.syncUpdates('userpost',this.applications);
    //   });
    //   console.log("inside onInit");
    // for( this.i=0; i<this.applications.length;this.i++)
    // {
    //   this.index= allposts.findIndex(x => x._id === this.applications[this.i].postid);
    //   console.log(this.index);
    //   if(this.index>=0)
    //   {
    //     this.allposts[this.index].apply=true;
    //     this.allposts[this.index].selected=this.applications[this.i].status;
    //   }



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
    console.log(post);
    this.$http.put(`/api/posts/${post._id}`, {
        name: post.name,
        info: post.info,
        maxapp: post.maxapp
      }).then((response)=>{console.log(response.data); this.reset(); });
  }
  Apply(index){
    this.post=this.allposts[index];
    this.user=this.CurrentUser();
    this.allposts[index].apply=true;
    // console.log(this.user);
    this.$http.post(`/api/userposts/`,{
      userid:this.user._id,
      postid:this.post._id
    });
    this.$http.get(`/api/userposts/user/${this.post._id}`).then(response=> {console.log("api/user/post"); console.log(response.data)});
  }
  loadpost()
  {
    this.user=this.CurrentUser();
    this.$http.get(`/api/userposts/post/${this.CurrentUser()._id}`)
      .then(response => {
        this.applications= response.data;
        this.socket.syncUpdates('userpost',this.applications);
      });
      // console.log("beforeloop");
  console.log(this.allposts);
      for( this.i=0; this.i<this.applications.length;this.i++)
    {
     this.index=-1;
      this.index= this.allposts.findIndex(x => x._id == this.applications[this.i].postid._id);
      // for(this.j=0; this.j<this.allposts.length;this.j++){
      //   console.log(this.allposts[this.j]._id,this.applications[this.i].postid._id)
      //   if(this.allposts[this.j]._id==this.applications[this.i].postid._id){
      //     this.index=this.j;
      //      break;
      //   }
      // }
      if(this.index>=0)
      {
        this.allposts[this.index].apply=true;
        this.allposts[this.index].selected=this.applications[this.i].status;
      }
    }
    // console.log(this.allposts);
}
    // deleteapp(index){
    //   this.post=this.allposts[index];
    //   // console.log("match", post._id);
    //   console.log("delete");
    //   this.appli=this.applications.findIndex(x => x.postid._id == this.post._id);
    //   if(this.appli==-1){this.allposts[index].apply=false; this.allposts.selected=false;}
    //   else{
    //   console.log(this.appli,"Delete");
    //   this.appid=this.applications[this.appli]._id;
    // this.$http.delete(`api/userposts/${this.appid}`).then((response)=> this.loadpost());
    // }
    // }
}

export default angular.module('yoApp.post', [uiRouter])
  .config(routes)
  .component('post', {
    template: require('./post.html'),
    controller: PostComponent

  })
  .name;
