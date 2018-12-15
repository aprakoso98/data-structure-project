'use strict';
/**
* @ngdoc function
* @name dataStructureProjectApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the dataStructureProjectApp
*/
angular.module('dataStructureProjectApp')
.controller('MainCtrl', function ($scope, _api) {
	this.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];
	window.scope = $scope = $scope;
  $scope.dataStatistik = {}
  _api.getSiswa().then(function(resp){
    resp.data.data.map(function(data){
      if ($scope.dataStatistik[data.Status]){
        $scope.dataStatistik[data.Status]++;
      }else{
        $scope.dataStatistik[data.Status] = 1;
      }
    });
  });
});
