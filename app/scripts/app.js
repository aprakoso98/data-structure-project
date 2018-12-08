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
      .when('/guru', {
        templateUrl: 'views/guru.html',
        controller: 'GuruCtrl',
        controllerAs: 'guru'
      })
      .when('/siswa', {
        templateUrl: 'views/siswa.html',
        controller: 'SiswaCtrl',
        controllerAs: 'siswa'
      })
      .when('/siswa/:kelas', {
        templateUrl: 'views/siswa-detail.html',
        controller: 'SiswaDetailCtrl',
        controllerAs: 'siswaDetail'
      })
      .when('/kelas', {
        templateUrl: 'views/kelas.html',
        controller: 'KelasCtrl',
        controllerAs: 'kelas'
      })
      .when('/mutasi', {
        templateUrl: 'views/mutasi.html',
        controller: 'MutasiCtrl',
        controllerAs: 'mutasi'
      })
      .when('/pelaporan', {
        templateUrl: 'views/pelaporan.html',
        controller: 'PelaporanCtrl',
        controllerAs: 'pelaporan'
      })
      .when('/pelaporan/:sub', {
        templateUrl: 'views/pelaporansub.html',
        controller: 'PelaporansubCtrl',
        controllerAs: 'pelaporanSub'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
