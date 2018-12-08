'use strict';

/**
 * @ngdoc function
 * @name dataStructureProjectApp.controller:PelaporansubCtrl
 * @description
 * # PelaporansubCtrl
 * Controller of the dataStructureProjectApp
 */
angular.module('dataStructureProjectApp')
  .controller('PelaporansubCtrl', function ($scope, $routeParams, _api, _loading) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $scope.complete = function(){
    	console.log(this)
	    $( "#tags" ).autocomplete({
	      source: $scope.availableTags
	    });
    } 
  });
