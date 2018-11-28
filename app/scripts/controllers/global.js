'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('GlobalCtrl', function ($rootScope, $location, _store, _dirHref) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.toppest = true;
	 	$rootScope.toggleMenu = [{
	 		name: 'Home',
	 		url: '#/',
	 		type: 'non-sub',
	 		cond: '/'
	 	}, {
	 		name: 'Guru',
	 		url: '#/guru',
	 		type: 'non-sub',
	 		cond: '/guru'
	 	}, {
	 		name: 'Siswa',
	 		url: '#/siswa',
	 		type: 'sub',
	 		sub: [{
	 			name: "Kelas 1a",
	 			id: "1a"
	 		}, {
	 			name: "Kelas 1b",
	 			id: "1b"
	 		}, {
	 			name: "Kelas 2a",
	 			id: "2a"
	 		}, {
	 			name: "Kelas 2b",
	 			id: "2b"
	 		}],
	 		cond: '/siswa'
	 	}]
	 	$rootScope.$on('$locationChangeStart', function (event, next, current) {
	 		$rootScope.currentPath = $location.$$path;
	 	});
	 	$rootScope.setIdSubMenu = function(url, id){
	 		_dirHref.go(url);
	 		_store.put("idSub", id);
	 	}
  });
