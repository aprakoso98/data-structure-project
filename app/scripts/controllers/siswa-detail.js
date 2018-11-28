'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:SiswaDetailCtrl
 * @description
 * # SiswaDetailCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('SiswaDetailCtrl', function ($scope, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];   
    window.scope = $scope = $scope;
    $scope.params = $routeParams;
		$scope.addData = function () {
		}
		$scope.ubahData = function(){
		}
		$scope.hapusData = function(){
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
