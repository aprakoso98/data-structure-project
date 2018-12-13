'use strict';
/**
 * @ngdoc directive
 * @name dataStructureProjectApp.directive:myTable
 * @description
 * # myTable
 */
angular.module('dataStructureProjectApp')
  .directive('myTable', function($rootScope, _sweet, _modal, _store) {
    return {
      restrict: 'E, A, C',
      templateUrl: 'table-template',
      link: function(scope, element, attrs, controller) {
        element = $(element);
        scope.$watch('options.aaData', handleModelUpdates, true);
        scope.$watch('options.addData', addData, true);
        scope.$watch('options.ubahData', ubahData, true);
        scope.$watch('options.hapusData', hapusData, true);
        scope.$watch('options.aoColumns', aoColumns, true);
        scope.$watch('options.loaded', loaded, true);
        scope.$watch('options.refreshData', function(fn) {
          scope.refreshData = fn;
        }, true);
        window.scopeTab = scope = scope;
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
            scope.myTable = table.dataTable(scope.options);
          }
        }
        function getDataSelect() {
          var index = element.find(".selected .table-index");
          return index.html();
        }
        function aoColumns(columns) {
          $rootScope.myModalData.columnsForm = columns;
          if (Array.isArray(columns)) {
            var toDelete = []
            for (var i = 0; i < columns.length; i++) {
              var col = columns[i]
              if ($rootScope.mappingInput.hasOwnProperty(col.sTitle)) {
                columns[i].valVal = $rootScope.mappingInput[col.sTitle];
              } else {
                columns[i].valVal = {
                  type: "input"
                }
              }
              if (col.hasOwnProperty("sClass")) {
                toDelete.push(i);
              }
            }
            for (var i = toDelete.length - 1; i >= 0; i--) {
              $rootScope.myModalData.columnsForm.splice(toDelete[i], 1);
            }
          }
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
            $rootScope.myModalData.dataEdit = []
            _modal.open({
              title: "Add Data",
              body: "form-modal",
              command: {
                "Add Data": {
                  class: 'btn-primary',
                  fn: function() {
                    var dataTable = [],
                      data = serializeArray($("#my-table-form"));
                    for (var key in data) {
                      dataTable.push(data[key]);
                    }
                    fn(data, function() {
                      scope.options.aaData.push(dataTable);
                      _modal.close();
                    });
                  }
                }
              }
            });
          }
        }
        function ubahData(fn) {
          scope.ubahData = function() {
            var i = getDataSelect();
            _store.put("dataEditTemp", scope.options.aaData[i]);
            $rootScope.myModalData.dataEdit = _store.get("dataEditTemp");
            if (i) {
              _modal.open({
                title: "Ubah Data",
                body: "form-modal",
                command: {
                  "Ubah Data": {
                    class: 'btn-primary',
                    fn: function() {
                      var dataTable = [],
                        data = serializeArray($("#my-table-form"));
                      for (var key in data) {
                        dataTable.push(data[key]);
                      }
                      fn(data, function() {
                        scope.options.aaData[i] = dataTable;
                        _modal.close();
                      });
                    }
                  }
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
                  fn(scope.options.aaData[i], function() {
                    scope.options.aaData.splice(i, 1);
                  });
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
  });
