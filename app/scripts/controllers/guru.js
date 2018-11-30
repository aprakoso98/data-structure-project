'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GuruCtrl
 * @description
 * # GuruCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GuruCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    window.scope = $scope = $scope;
		$scope.addData = function () {
		}
		$scope.ubahData = function(){
		}
		$scope.hapusData = function(){
		}
		$scope.counter = 5;
    $scope.myTable = null;
		$scope.options = {
			oClasses: {
				sFilterInput: 'form-control'
			},
			aoColumns: [{
				sTitle: "NIS"
			}, {
				sTitle: "NISN"
			}, {
				sTitle: "Nama"
			}, {
				sTitle: "TTL"
			}, {
				sTitle: "kjahdk"
			}],
			select: {
				style: "single"
			},
			sScrollX: "100%",
	    sScrollXInner: "110%",
			bJQueryUI: true,
			bDestroy: true,
			addData: $scope.addData,
			ubahData: $scope.ubahData,
			hapusData: $scope.hapusData
		}
		setTimeout(function(){
			$scope.options.aaData = [[1, 1,1,1,1],[2, 2,2,2,2],[3, 3,3,3,3],[4, 4,4,4,4],[5, 5,5,5,5]]
			$scope.$apply();
		}, 1000);
  });
