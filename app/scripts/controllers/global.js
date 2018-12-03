'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GlobalCtrl', function($rootScope, $location, _http, _api, _modal) {
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
          data.sub = data.name == "Siswa" ? resp.data : data.sub;
          return data;
        });
      });
    });
    $rootScope.myModal = {}
    $rootScope.FormLogin = {}
    $rootScope.toppest = true;
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      $rootScope.currentPath = $location.$$path;
    });
    $rootScope.doLogin = function(){
      _modal.open({
        title: "Login",
        body: "login",
        command: {
          "Sign In": {
            class: "btn-primary",
            fn: function(){
              _modal.open({
                class: "modal-sm",
                title: "Login Berhasil",
                body: JSON.stringify($rootScope.FormLogin)
              });
            }
          }
        }
      })
    }
    $rootScope.doLogout = function(){
      _modal.open({
        class: "modal-sm",
        title: "Logout Berhasil",
        body: JSON.stringify($rootScope.FormLogin)
      });
    }
  });
