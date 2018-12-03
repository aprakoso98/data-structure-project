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
  .directive('ngAlias', function($compile) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var args = attrs.ngAlias.split('as').map(function(elm) { return elm.replace(/ /g, '') });
        scope[args[0]] = '';
        var dot = args[1].split('.');
        var object = {};
        dot.forEach(function(value, index) {
          index === 0 ? object = scope[value] : object = object[value] === null ? object[value] = {} : object[value];
        });
        scope[args[0]] = object;
      }
    };
  })
  .directive('myTable', function($rootScope, _sweet) {
    return {
      restrict: 'E, A, C',
      templateUrl: 'table-template',
      link: function(scope, element, attrs, controller) {
        element = $(element);
        scope.$watch('options.aaData', handleModelUpdates, true);
        scope.$watch('options.addData', addData, true);
        scope.$watch('options.ubahData', ubahData, true);
        scope.$watch('options.hapusData', hapusData, true);
        scope.$watch('options.loaded', loaded, true);
        var forms = {
          text: function(id, name, value) {
            return sprintf('<div class="form-group">\
              <label for="%s">%s</label>\
              <input type="text" class="form-control" id="%s" name="%s" value="%s">\
            </div>', id, name, id, id, value);
          },
          select: function(id, name, options){
            options = options.map(function(opt){
              return sprintf("<option>%s</option>", opt);
            }).join("");
            return sprintf('<div class="form-group">\
              <label for="%s">%s</label>\
              <select class="form-control" id="%s" name="%s">\
                <option disabled value="">%s</option>%s\
              </select>\
            </div>', id, name, id, id, name, options);
          },
          textarea: function(id, name, value){
            return sprintf('<div class="form-group">\
              <label for="%s">%s</label>\
              <textarea class="form-control" id="%s" name="%s" rows="3">%s</textarea>\
            </div>', id, name, id, id, value);
          }
        }

        function loaded(isTrue) {
          if (isTrue) {
            var table = element.find("table");
            var obj = {
              sScrollX: "1000%",
              sScrollXInner: "100%",
              bJQueryUI: true,
              bDestroy: true,
              select: {
                style: "single"
              },
              oClasses: {
                sFilterInput: 'form-control'
              }
            }
            scope.options.aoColumns = [{
              className: "table-index",
              render: function(data, type, full, meta) {
                return meta.row;
              }
            }].concat(scope.options.aoColumns);
            scope.options = Object.assign(obj, scope.options);
            console.log(scope.options);
            scope.myTable = table.dataTable(scope.options);
          }
        }

        function getDataSelect() {
          var index = element.find(".selected .table-index");
          return index.html();
        }

        function handleModelUpdates(data) {
          try {
            if (Array.isArray(data)) {
              if (data.length > 0) {
                data = data;
                data = data.map(function(a) {
                  return [null].concat(a);
                });
              } else {
                data = null;
              }
            } else {
              data = null;
            }
            scope.myTable.fnClearTable();
            if (data) {
              scope.myTable.fnAddData(data);
            }
          } catch (err) {
            // console.error(err);
          }
        }

        function addData(fn) {
          scope.addData = function() {
            var columns = scope.options.aoColumns;
            _sweet({
              title: 'Add Data',
              showCancelButton: true,
              confirmButtonText: "Add",
              html: sprintf('<form id="form-swal">%s</form>', columns.map(function(dt, index) {
                var ret = "";
                if (index != 0){
                  if ($rootScope.mappingInput.hasOwnProperty(dt.sTitle)){
                    var oData = $rootScope.mappingInput[dt.sTitle]
                    if (oData.type == "select"){
                      ret = forms.select(dt.sTitle, dt.sTitle, oData.val);
                    }else if (oData.type == "textarea"){
                      ret = forms.textarea(dt.sTitle, dt.sTitle, "");
                    }else{
                      ret = forms.text(dt.sTitle, dt.sTitle, "");
                    }
                  }else{
                    ret = forms.text(dt.sTitle, dt.sTitle, "");
                  }
                }
                return ret;
              }).join("")),
              preConfirm: function() {
                var ret = []
                var data = $("#form-swal").serializeArray();
                data.map(function(dt){
                  ret.push(dt.value);
                });
                fn(ret)
                // return ret;
              }
            }).then(function(resp) {
              if (resp.value) {
                // scope.options.aaData.push(resp.value);
                // scope.$apply();
              }
            });
          }
        }

        function ubahData(fn) {
          scope.ubahData = function() {
            var i = getDataSelect(),
              data = scope.options.aaData[i],
              columns = scope.options.aoColumns;
            if (i) {
              _sweet({
                title: 'Edit Data',
                html: columns.map(function(dt, index) {
                  return index != 0 ? sprintf('%s<input id="swal-input%s" class="swal2-input" value="%s">', dt.sTitle, index - 1, data[index - 1]) : '';
                }).join(""),
                preConfirm: function() {
                  var ret = []
                  for (var i = 0; i < columns.length; i++) {
                    if (i != 0) {
                      ret.push($('#swal-input' + (i - 1)).val());
                    }
                  }
                  return ret;
                }
              }).then(function(resp) {
                if (resp.value) {
                  scope.options.aaData[i] = resp.value;
                  scope.$apply();
                }
              });
            } else {
              _sweet("Pilih salah satu data", "", "warning");
            }
          }
        }

        function hapusData(fn) {
          scope.hapusData = function() {
            var i = getDataSelect();
            if (i) {
              _sweet({
                showCancelButton: true,
                type: 'question',
                title: "Hapus data ini?"
              }).then(function(resp) {
                if (resp.value) {
                  scope.options.aaData.splice(i, 1);
                  scope.$apply();
                }
              });
            } else {
              _sweet("Pilih salah satu data", "", "warning");
            }
          }
        }
      },
      scope: {
        myTable: "=",
        options: "="
      }
    };
  })
  .directive('toggleMenuSide', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sidebar-toggled");
          $(".sidebar").toggleClass("toggled");
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
