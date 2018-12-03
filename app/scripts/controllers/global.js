'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GlobalCtrl', function($rootScope, $location, _http, _api) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.rootScope = $rootScope = $rootScope;
    _http.get("json/mappingInput.json").then(function(resp) {
      $rootScope.mappingInput = resp.data;
    });
    _http.get("json/toggleMenu.json").then(function(resp) {
      $rootScope.toggleMenu = resp.data;
      _api.getKelas().then(function(resp) {
        $rootScope.allKelas = resp.data;
        $rootScope.toggleMenu.map(function(data) {
          data.sub = data.name == "Kelas" ? resp.data : data.sub;
          return data;
        });
      });
    });
    $rootScope.toppest = true;
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      $rootScope.currentPath = $location.$$path;
    });
  });
