'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GlobalCtrl', function($rootScope, $location, _http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    _http.get("json/toggleMenu.json").then(function(resp) {
      $rootScope.toggleMenu = resp.data;
    });
    $rootScope.toppest = true;
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      $rootScope.currentPath = $location.$$path;
    });
    $rootScope.setIdSubMenu = function(url, id) {
      _dirHref.go(url);
      _store.put("idSub", id);
    }
  });
