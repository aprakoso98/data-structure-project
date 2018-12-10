'use strict';
/**
 * @ngdoc directive
 * @name dataStructureProjectApp.directive:directives
 * @description
 * # directives
 */
angular.module('dataStructureProjectApp')
  .directive('commandTable', function() {
    return {
      scope: {
        commandTable: '@'
      },
      link: function(scope, ele, attr) {
        scope.$watch("commandTable", function() {
          var element = $(ele);
          $(ele).append("<span class='command-hover'>" + scope.commandTable + "</span>");
          $(ele).hover(function() {
            element.find(".command-hover").toggleClass('show-value');
          }, function() {
            element.find(".command-hover").removeClass('show-value');
          });
        });
      }
    }
  })
  .directive('onFinishRender', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$emit(attr.onFinishRender);
          });
        }
      }
    }
  })
  .directive('bindHtmlCompile', function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(function() {
          return scope.$eval(attrs.bindHtmlCompile);
        }, function(value) {
          element.html(value && value.toString());
          if (attrs.bindHtmlScope) {
            scope = scope.$eval(attrs.bindHtmlScope);
          }
          $compile(element.contents())(scope);
        });
      }
    }
  })
  .directive('breadcrumb', function($rootScope) {
    return {
      restrict: 'AE',
      templateUrl: 'breadcrumb',
      link: function(scope, element, attrs) {
        var hash = location.hash;
        var hashs = hash.split("/");
        for (var i = 0; i < hashs.length; i++) {
          var obj = {
            name: i == 0 ? "Home" : hashs[i].ucfirst(),
            link: i == 0 ? hashs[i] : hashs[i - 1].link + hashs[i],
            isTrue: Boolean(hashs[i])
          }
          if (obj.name) {
            obj.link = obj.link.replace(/!/g, "") + "/";
            hashs[i] = obj;
          } else {
            hashs.splice(i, 1);
          }
        }
        scope.dataLink = hashs.map(function(data, i) {
          data.name = decodeURI(data.name);
          var link = $("<a>").attr({
            "dir-href": data.link
          }).html(data.name);
          var view = $("<li>").attr({
              class: "breadcrumb-item"
            }).html(link),
            first = "";
          if (hashs.length - 1 == i) {
            view.addClass("active").html(data.name);
          }
          return view[0].outerHTML + first;
        }).join("");
      }
    }
  })
  .directive('ngAlias', function() {
    return {
      link: function($scope, elem, attrs) {
        function set(path, val, scope, i) {
          var key = path[i];
          if (i === path.length - 1) return scope[key] = val;
          if (angular.isUndefined(scope[key])) scope[key] = {};
          return set(path, val, scope[key], i + 1);
        }
        var aliases = attrs.ngAlias.split(',');
        window.scopeAlias = scope = scope;
        angular.forEach(aliases, function(alias) {
          var parts = alias.split(' as ');
          var path = parts[0].trim().split('.');
          $scope.$watch(parts[1].trim(), function(val) {
            set(path, val, $scope, 0);
          });
        });
      }
    };
  })
  .directive('toggleMenuSide', function() {
    return {
      restrict: 'A',
      scope: {
        toggleMenuSide: '@'
      },
      link: function(scope, element, attrs) {
        var tog;

        function toggle() {
          if (tog) {
            $("body").removeClass("sidebar-toggled");
            $(".sidebar").removeClass("toggled");
            tog = false;
          } else {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            tog = true;
          }
        }
        scope.$watch('toggleMenuSide', function(val) {
          tog = val == 'true' ? true : false;
          toggle();
        });
        element.on("click", function(e) {
          e.preventDefault();
          toggle();
        });
      }
    }
  })
  .directive('dirHref', function(_dirHref) {
    return {
      restrict: 'A',
      scope: {
        dirHref: '@'
      },
      link: function(scope, element, attrs) {
        element.on("click", function() {
          _dirHref.go(scope.dirHref);
        });
        jQuery(element).css("cursor", "pointer");
      }
    }
  })
  .directive('loadingSrc', function() {
    return {
      scope: {
        sgSrc: '=',
        loadingSrc: "@"
      },
      link: function(scope, ele, attr) {
        scope.$watch("sgSrc", function(newVal) {
          var img = new Image();
          img.onerror = function() {
            ele[0].src = scope.loadingSrc;
          }
          img.onload = function() {
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
            scrollTo(0, stopY);
            return;
          }
          var speed = Math.round(distance / 100);
          if (speed >= 20) speed = 20;
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          if (stopY > startY) {
            for (i = startY; i < stopY; i += step) {
              setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
              leapY += step;
              if (leapY > stopY) leapY = stopY;
              timer++;
            }
            return;
          }
          for (i = startY; i > stopY; i -= step) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
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
          }
          return y;
        }
      }
    };
  });
