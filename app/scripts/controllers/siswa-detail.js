'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:SiswaDetailCtrl
 * @description
 * # SiswaDetailCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('SiswaDetailCtrl', function($scope, $routeParams, _api, _loading) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.scope = $scope = $scope;
    $scope.params = $routeParams;
    $scope.addData = function(data, callback) {
      _api.addUpdateSiswa(data).then(function(resp){
        if (resp.data == 1){
          callback();
        }
      });
    }
    $scope.ubahData = function(data, callback) {
      _api.addUpdateSiswa(data).then(function(resp){
        if (resp.data == 1){
          callback();
        }
      });
    }
    $scope.hapusData = function(data, callback) {
      _api.deleteSiswa({
        NIS: data[0],
        NISN: data[1]
      }).then(function(resp){
        if (resp.data == 1){
          callback();
        }
      });
    }
    $scope.counter = 5;
    $scope.myTable = null;
    $scope.options = {
      canDelete: false,
      addData: $scope.addData,
      ubahData: $scope.ubahData,
      hapusData: $scope.hapusData
    }
    _api.getSiswaKelas($scope.params.kelas).then(function(resp) {
      var col = [],
        row = [],
        data = resp.data;
      for (var i = 0; i < data.length; i++) {
        var temp = data[i]
        var tempData = []
        for (var key in data[i]) {
          tempData.push(data[i][key]);
          if (i == 0) {
            col.push({
              sTitle: key
            });
          }
        }
        row.push(tempData);
      }
      $scope.options.aoColumns = col;
      $scope.options.loaded = true;
      setTimeout(function() {
        $scope.options.aaData = row;
        $scope.$apply();
      }, 1000);
    });
  });
