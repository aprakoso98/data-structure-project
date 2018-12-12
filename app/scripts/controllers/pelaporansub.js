'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:PelaporansubCtrl
 * @description
 * # PelaporansubCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('PelaporansubCtrl', function($scope, $routeParams, _api, _loading) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.scope = $scope = $scope;
    $scope.stringify = function(data) {
      return stringify(data, "    ");
    }
    $scope.exportMutasi = function() {
      var mutasi = $scope.selected.Mutasi;
      if (!mutasi || mutasi.id < 1) {
        swal("Peringatan", "Anda belum memilih status export", "warning");
      } else {
        window.open(api + "/data-structure-ws/rest/mutasi/export?status=" + mutasi.id, "_blank");
      }
    }
    $scope.mutasiSelect = [{
      name: 'Baru',
      id: 1
    }, {
      name: 'Naik Kelas',
      id: 2
    }, {
      name: 'Pindahan',
      id: 3
    }]

    $scope.formLomba = {}

    $scope.selected = {}
    $scope.params = $routeParams;
    _api.getSiswa().then(function(resp) {
      $scope.dataSiswa = resp.data.data;
    });
  });
