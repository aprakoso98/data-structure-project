'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
