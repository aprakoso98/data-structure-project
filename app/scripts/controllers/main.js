'use strict';
/**
* @ngdoc function
* @name dataStructureProjectApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the dataStructureProjectApp
*/
angular.module('dataStructureProjectApp')
.controller('MainCtrl', function ($scope, _modal) {
	this.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];
	window.scope = $scope = $scope;
	$scope.jumlah = {
		guru: 50,
		siswa: 50
	}
	$scope.closeModal = function(){
		_modal.close();
	}
	$scope.openModal = function(){
    _modal.open({
      title: "My Modal",
      command: {
      	"Add-Guru": {
      		class: 'btn-primary',
      		fn: function(){
      			$scope.jumlah.guru++;
      		}
      	},
      	"Add-Siswa": {
      		class: 'btn-danger',
      		fn: function(){
      			$scope.jumlah.siswa++;
      		}
      	}
      }
    });
  }
  $scope.openModal2 = function(){
    _modal.open({
      title: "My Modal 2 Bouss",
      command: {
      	"Remove-Guru": {
      		class: 'btn-primary',
      		fn: function(){
      			$scope.jumlah.guru--;
      		}
      	},
      	"Remove-Siswa": {
      		class: 'btn-danger',
      		fn: function(){
      			$scope.jumlah.siswa--;
      		}
      	}
      }
    });
  }
});
