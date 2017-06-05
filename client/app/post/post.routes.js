'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('post', {
      url: '/post',
      template: '<post></post>',
      authenticate: true
    });
}
