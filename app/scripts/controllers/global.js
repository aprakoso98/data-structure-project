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
    _http.get("json/toggleMenu.json").then(function(resp) {
      $rootScope.toggleMenu = resp.data;
      _api.getKelas().then(function(resp){
        $rootScope.toggleMenu.map(function(data){
          data.sub = data.name == "Siswa" ? resp.data : data.sub;
          return data;
        });
      });
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
