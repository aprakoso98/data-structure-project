'use strict';

/**
 * @ngdoc filter
 * @name dataStructureProjectApp.filter:filters
 * @function
 * @description
 * # filters
 * Filter in the dataStructureProjectApp.
 */
angular.module('dataStructureProjectApp')
  .filter('filters', function () {
    return function (input) {
      return 'filters filter: ' + input;
    };
  });
