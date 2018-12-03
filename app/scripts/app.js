'use strict';
/**
 * @ngdoc overview
 * @name dataStructureProjectApp
 * @description
 * # dataStructureProjectApp
 *
 * Main module of the application.
 */
var api = "http://localhost:20000";
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
      .when('/kelas', {
        templateUrl: 'views/siswa.html',
        controller: 'SiswaCtrl',
        controllerAs: 'siswa'
      })
      .when('/guru', {
        templateUrl: 'views/guru.html',
        controller: 'GuruCtrl',
        controllerAs: 'guru'
      })
      .when('/kelas/:kelas', {
        templateUrl: 'views/siswa-detail.html',
        controller: 'SiswaDetailCtrl',
        controllerAs: 'siswaDetail'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
