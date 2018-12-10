'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GuruCtrl
 * @description
 * # GuruCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GuruCtrl', function($scope, _api) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.scope = $scope = $scope;
    $scope.addData = function(data, callback) {
      _api.addUpdateGuru(data).then(function(resp) {
        if (resp.data == 1) {
          callback();
        }
      });
    }
    $scope.ubahData = function(data, callback) {
      _api.addUpdateGuru(data).then(function(resp) {
        if (resp.data == 1) {
          callback();
        }
      });
    }
    $scope.hapusData = function(data, callback) {
      _api.deleteGuru({
        "ID Guru": data[0],
        NIP: data[1]
      }).then(function(resp) {
        if (resp.data == 1) {
          callback();
        }
      });
    }
    $scope.getData = function() {
      _api.getAllGuru().then(function(resp) {
        var row = [],
          data = resp.data;
        $scope.options.aoColumns = data.column.map(function(data) {
          return {
            sTitle: data
          }
        });
        for (var i = 0; i < data.data.length; i++) {
          var tempData = []
          var temp = data.data[i]
          for (var key in temp) {
            tempData.push(temp[key]);
          }
          row.push(tempData);
        }
        $scope.options.loaded = true;
        setTimeout(function() {
          $scope.options.aaData = row;
          $scope.$apply();
        }, 1000);
      });
    }
    $scope.myTable = null;
    $scope.options = {
      canDelete: false,
      refreshData: $scope.getData,
      addData: $scope.addData,
      ubahData: $scope.ubahData,
      hapusData: $scope.hapusData
    }
    $scope.getData();
  });
