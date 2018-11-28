'use strict';
// jQuery.noConflict();
/**
 * @ngdoc overview
 * @name dataStructureProjectApp
 * @description
 * # dataStructureProjectApp
 *
 * Main module of the application.
 */
angular
  .module('dataStructureProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/siswa', {
        templateUrl: 'views/siswa.html',
        controller: 'SiswaCtrl',
        controllerAs: 'siswa'
      })
      .when('/guru', {
        templateUrl: 'views/guru.html',
        controller: 'GuruCtrl',
        controllerAs: 'guru'
      })
      .when('/siswa/:kelas', {
        templateUrl: 'views/siswa-detail.html',
        controller: 'SiswaDetailCtrl',
        controllerAs: 'siswaDetail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
