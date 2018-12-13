'use strict';

/**
 * @ngdoc directive
 * @name dataStructureProjectApp.directive:autoCompleteInput
 * @description
 * # autoCompleteInput
 */
angular.module('dataStructureProjectApp')
  .directive('autoCompleteInput', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: "autocomplete",
      scope: {
        data: '=',
        selectedData: '=',
        classInput: '@',
        filter: '@',
        view: '@',
        orderBy: '@'
      },
      link: function(scope, element, attr) {
        scope.$watch('orderBy', function(order) {
          if (order) {
            order = order.replace(/ /g, "").split(",");
            scope.filterSort = order;
          }
        });
        scope.$watch('search', function(val){
          if (scope.filter != 'false'){
            scope.filterData = scope.search;
          }
        });
        scope.blur = function() {
          setTimeout(function() {
            scope.visible = false;
            scope.$apply();
          }, 150);
        }
        scope.displayed = function() {
          scope.visible = true;
        }
        scope.clearSelection = function() {
          scope.selectedData = "";
          scope.search = "";
        }
        scope.select = function(data) {
          scope.selectedData = data;
          if (scope.view) {
            scope.visible = false;
            var regex = /{([a-z0-9\-]+)}/gi,
              props = scope.view.match(regex).map(function(prop) {
                var value = prop.replace(/{/g, "").replace(/}/g, "");
                return DotObject.pick(value, scope.selectedData);
              }),
              view = scope.view.replace(regex, "%s");
            scope.search = vsprintf(view, props);
          } else {
            scope.search = data;
          }
        }
      }
    }
  })
  .directive('inject', function() {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        if (!$transclude) {
          throw minErr('ngTransclude')('orphan',
            'Illegal use of ngTransclude directive in the template! ' +
            'No parent directive that requires a transclusion found. ' +
            'Element: {0}',
            startingTag($element));
        }
        var innerScope = $scope.$new();
        $transclude(innerScope, function(clone) {
          $element.empty();
          $element.append(clone);
          $element.on('$destroy', function() {
            innerScope.$destroy();
          });
        });
      }
    };
  });
