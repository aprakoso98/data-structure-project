'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:KelasCtrl
 * @description
 * # KelasCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('KelasCtrl', function ($scope) {
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
			},{
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
			bJQueryUI: true,
			bDestroy: true,
			addData: $scope.addData,
			ubahData: $scope.ubahData,
			hapusData: $scope.hapusData
		}
		setTimeout(function(){
			$scope.options.aaData = [["iuasdyaskjdhaskjhdkjashdjkhaskjhdkjashdkjashkjdhkasjhdkjashdjkashkjdhasjkdhkasjhdkjasdhksjhdjkhaskjdhashdkjhsjpoiewuioruewhjzxhfjkhsdkjhfkhmnzmnjkdshkjshfdkjh",9832798234781,3782678684321,2837483268471,9823783874321,87234627634781,8723469879841,982743863451,978267868732648723641,18725786],[2,2,2,2,2,2,2,2,2,2],[3,3,3,3,3,3,3,3,3,3],[4,4,4,4,4,4,4,4,4,4],[5,5,5,5,5,5,5,5,5,5]]
			$scope.$apply();
		}, 200);
  });
