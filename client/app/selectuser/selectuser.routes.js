'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('selectuser', {
      url: '/selectuser',
      template: '<selectuser></selectuser>', 
      authenticate:"admin"
    });
}
