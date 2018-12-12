'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:PelaporansubCtrl
 * @description
 * # PelaporansubCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('PelaporansubCtrl', function ($scope, $routeParams, _api, _loading) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.scope = $scope = $scope;
    $scope.stringify = function(data){
      return stringify(data, "    ");
    }
    $scope.exportMutasi = function(){
      window.open(api + "/data-structure-ws/rest/mutasi/export", "_blank");
    }
    $scope.params = $routeParams;
    $scope.formLomba = {}
    $scope.selected = "";
    _api.getSiswa().then(function(resp){
      $scope.dataSiswa = resp.data.data;
    });
  });
