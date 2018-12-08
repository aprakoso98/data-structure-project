'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GlobalCtrl', function($rootScope, $location, _http, _store, _api, _modal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.rootScope = $rootScope = $rootScope;
    _http.get("json/mappingInput.json").then(function(resp) {
      $rootScope.mappingInput = resp.data;
    });
    _api.getKelas();
    $rootScope.myModal = {}
    $rootScope.myModalData = {}
    $rootScope.FormLogin = {}
    $rootScope.toppest = true;
    $rootScope.ngView = _store.get("ngView") || "NotLoggedIn";
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      $rootScope.currentPath = $location.$$path;
    });
    $rootScope.toValidId = function(str){
      return str.toValidId();
    }
    $rootScope.doLogout = function(){
      $rootScope.ngView = "NotLoggedIn";
      _store.put("ngView", "NotLoggedIn");
    }
  });
