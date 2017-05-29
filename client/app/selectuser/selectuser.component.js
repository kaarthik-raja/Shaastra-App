'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './selectuser.routes';

export class SelectuserComponent {
  /*@ngInject*/
  allposts=[];
  applications=[];
  constructor($http, $scope, socket, Auth) {

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.i=0;
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
      this.$http.get(`/api/userposts/`)
      .then(response => {
        this.applications= response.data;
        this.socket.syncUpdates('userpost',this.applications);
      });
  }
  Approve(appli){

  }
  Delete(appli){
    this.$http.delete(`api/userposts/${this.appli._id}`).then((response)=>console.log(response.data));
  }

}

export default angular.module('yoApp.selectuser', [uiRouter])
  .config(routes)
  .component('selectuser', {
    template: require('./selectuser.html'),
    controller: SelectuserComponent,
    controllerAs: 'selectuserCtrl'
  })
  .name;
