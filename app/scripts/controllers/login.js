'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('LoginCtrl', function ($scope, $rootScope, _store, _dirHref) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if (_store.get("ngView") == 'NotLoggedIn'){
    	_dirHref.go('#/');
    }
    $scope.FormLogin = {}
    $scope.doLogin = function(){
      console.log($scope.FormLogin)
      if ($scope.FormLogin.username == "admin" && $scope.FormLogin.password == "admin"){
        $rootScope.ngView = 'LoggedIn';
        _store.put("ngView", "LoggedIn");
      }
    }
  });
