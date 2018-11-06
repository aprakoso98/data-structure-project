'use strict';

/**
* @ngdoc directive
* @name dataStructureProjectApp.directive:directives
* @description
* # directives
*/
angular.module('dataStructureProjectApp')
.directive('dirHref', function () {
  return {
    restrict: 'A',
    scope: { dirHref: '@' },
    link: function postLink(scope, element, attrs) {
      element.on("click", function(){
        var host = location.origin;
        var url = host + location.pathname + scope.dirHref;
        url = url.replace("#", "#!");
        location.href = url;
      });
      jQuery(element).css("cursor", "pointer");
    }
  }
})
.directive('loadingSrc', function () {
  return {
    scope: {
      sgSrc: '=',
      loadingSrc: "@"
    },
    link: function (scope, ele, attr) {
      scope.$watch("sgSrc", function (newVal) {
        var img = new Image();
        img.onerror = function(){
          ele[0].src = scope.loadingSrc;
        }
        img.onload = function(){
          ele[0].src = img.src;
        }
        img.src = newVal;
      });
    }
  }
});
