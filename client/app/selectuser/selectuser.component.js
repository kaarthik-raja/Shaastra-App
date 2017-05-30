'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './selectuser.routes';

export class SelectuserComponent {
  /*@ngInject*/
  allposts=[];
  applications=[];
  $http;
  socket;
  constructor($http, $scope, socket) {

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.selectedpost=[];

    this.i=0;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('post');
    });
    console.log("constructor");
  }
  $onInit() {
      console.log("inside Init");
      this.$http.get(`/api/posts`)
      .then(response => {
        this.allposts = response.data;
        console.log(response.data);
        console.log("Posts");
        this.socket.syncUpdates('post', this.allposts);

      });
      this.$http.get(`/api/userposts/`)
      .then(response => {
        this.applications= response.data;
        console.log(response.data);
        console.log("apps");
        this.socket.syncUpdates('userpost',this.applications);
      });
  }
  Approve(appli){
    this.$http.put(`/api/userposts/${appli._id}`,{

      status:true
    }).then((response)=> {console.log(response.data);console.log("status changed");});
    appli.postid.maxapp-=1;
    this.$http.put(`/api/posts/${appli.postid._id}`,{
      maxapp:appli.postid.maxapp
    }).then((response)=> {console.log(response.data);console.log("maxpost changed");
    });

  }

  Delete(appli){
    this.$http.delete(`api/userposts/${appli._id}`).then((response)=>console.log(response.data));
  }

}

export default angular.module('yoApp.selectuser', [uiRouter])
  .config(routes)
  .component('selectuser', {
    template: require('./selectuser.html'),
    controller: SelectuserComponent
  })
  .name;
