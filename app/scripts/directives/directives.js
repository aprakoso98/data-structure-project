'use strict';
/**
* @ngdoc directive
* @name dataStructureProjectApp.directive:directives
* @description
* # directives
*/
angular.module('dataStructureProjectApp')
.directive('toggleMenuSide', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on("click", function(e){
        e.preventDefault();
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
      });
    }
  }
})
.directive('dirHref', function(){
  return {
    restrict: 'A',
    scope: {
      dirHref: '@'
    },
    link: function(scope, element, attrs) {
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
.directive('loadingSrc', function(){
  return {
    scope: {
      sgSrc: '=',
      loadingSrc: "@"
    },
    link: function (scope, ele, attr) {
      scope.$watch("sgSrc", function(newVal){
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
})
.directive('anchorSmoothScroll', function($rootScope, $location) {
  'use strict';
  return {
    restrict: 'A',
    replace: false,
    scope: {
      'anchorSmoothScroll': '@'
    },
    link: function($scope, $element, $attrs) {
      initialize();
      function initialize() {
        createEventListeners();
      }
      function createEventListeners() {
        $element.on('click', function() {
          $location.hash($scope.anchorSmoothScroll);
          $rootScope.toppest = true;
          scrollTo($scope.anchorSmoothScroll);
        });
      }
      function scrollTo(eID) {
        var i;
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
          scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
          for (i = startY; i < stopY; i += step) {
            setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
          } return;
        }
        for (i = startY; i > stopY; i -= step) {
          setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
      }
      function currentYPosition() {
        if (window.pageYOffset) {
          return window.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      }
      function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        } return y;
      }
    }
  };
});
