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
			$scope.counter = $scope.counter + 1;
			$scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
		}
		$scope.ubahData = function(){

		}
		$scope.hapusData = function(){
			var i = $scope.options.aaData.length - 1;
			$scope.options.aaData.splice(i, 1);
		}
		$scope.counter = 5;
    $scope.myTable = null;
		$scope.options = {
			aoColumns: [{
				sTitle: "Surname"
			}, {
				sTitle: "First Name"
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
			$scope.options.aaData = [[1, 1],[2, 2],[3, 3],[4, 4],[5, 5]]
			$scope.$apply();
		}, 1000);
  });
