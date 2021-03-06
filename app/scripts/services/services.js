'use strict';

/**
 * @ngdoc service
 * @name dataStructureProjectApp.services
 * @description
 * # services
 * Service in the dataStructureProjectApp.
 */
angular.module('dataStructureProjectApp')
  .service('_sweet', function() {
    return swal;
  })
  .service('_loading', function() {
    return {
      show: function() {
        $(".loading").addClass("visible");
      },
      hide: function() {
        $(".loading").removeClass("visible");
      }
    }
  })
  .service('_modal', function($rootScope, $templateCache) {
    return {
      open: function(myModal) {
        var close = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        myModal = myModal || {}
        myModal.Command = {}
        myModal.commandText = "";
        myModal.body = myModal.body || "";
        var selectedModal = "MyModal",
          template = $templateCache.get(myModal.body);
        if (!myModal.body.isHTML()) {
          if (template && myModal.body != selectedModal) {
            myModal.body = template;
          }
        }
        if (myModal.command) {
          for (var key in myModal.command) {
            var val = myModal.command[key]
            var btn = sprintf('<button type="button" class="btn %s" ng-click="myModal.Command[\'%s\']()">%s</button>', val.class || "", key, key);
            myModal.Command[key] = val.fn;
            myModal.commandText += btn;
          }
        }
        myModal.commandText += close;
        $rootScope.myModal = myModal;
        $('#myModal').modal({
          backdrop: 'static',
          keyboard: false,
          show: true
        });
      },
      close: function() {
        $('#myModal').modal('hide');
      }
    }
  })
  .service('_dirHref', function() {
    return {
      go: function(urlPath) {
        var host = location.origin;
        var url = host + location.pathname + urlPath;
        url = url.replace("#", "#!");
        location.href = url;
      }
    }
  })
  .service('_api', function($q, $rootScope, _http) {
    $rootScope.apiPath = api;
    return {
      getKelas: function() {
        var q = $q.defer();
        _http.get(api + "/data-structure-ws/rest/kelas/all").then(function(resp) {
          $rootScope.allKelas = resp.data;
          q.resolve(resp);
        }, function(err){
        	q.reject(err);
        });
        return q.promise;
      },
      getSiswa: function(){
        return _http.get(api + "/data-structure-ws/rest/siswa/all");
      },
      getSiswaKelas: function(kelas) {
        return _http.post(api + "/data-structure-ws/rest/siswa/find-by-kelas", {
          search: {
            kelas: kelas
          }
        });
      },
      addUpdateSiswa: function(param) {
        return _http.post(api + "/data-structure-ws/rest/siswa/insert-or-update", param);
      },
      deleteSiswa: function(param) {
        return _http.post(api + "/data-structure-ws/rest/siswa/delete", param);
      },
      getAllGuru: function() {
        return _http.get(api + "/data-structure-ws/rest/guru/id");
      },
      addUpdateGuru: function(param) {
        return _http.post(api + "/data-structure-ws/rest/guru/insert-or-update", param);
      },
      deleteGuru: function(param) {
        return _http.post(api + "/data-structure-ws/rest/guru/delete", param);
      },
      addUpdateKelas: function(param) {
        return _http.post(api + "/data-structure-ws/rest/kelas/insert-or-update", param);
      },
      deleteKelas: function(param) {
        return _http.post(api + "/data-structure-ws/rest/kelas/delete", param);
      },
    }
  })
  .service('_http', function($q, $http) {
    return {
      ajax: function(url, data, method, headers) {
        var q = $q.defer();
        $http({
          method: method,
          url: url,
          timeout: 120 * 1000,
          headers: headers || {},
          data: data || {}
        }).then(function(succ) {
          q.resolve(succ);
        }, function(err) {
          q.reject(err);
        });
        var log = JSON.stringify(data || {});
        log = log.length > 300 ? "Too long parameters" : log;
        console.debug(sprintf('_http Accessing %s with parameter %s', url, log));
        return q.promise;
      },
      post: function(url, data, headers) {
        return this.ajax(url, data, "post", headers);
      },
      get: function(url, data, headers) {
        return this.ajax(url, data, "get", headers);
      }
    }
  })
  .service('_store', function() {
    return {
      put: function(key, value) {
        if (typeof value == 'object') value = JSON.stringify(value);
        localStorage.setItem(key, value);
      },
      putObj: function(obj) {
        if (typeof obj != 'object') obj = {};
        for (var key in obj) {
          this.put(key, obj[key]);
        }
      },
      get: function(key) {
        var value = localStorage.getItem(key);
        try {
          if (["{", "["].Contains(value.charAt(0))) {
            return JSON.parse(value);
          } else {
            return value;
          }
        } catch (err) {
          return undefined;
        }
      },
      getObj: function(arr) {
        var ret = {}
        if (!Array.isArray(arr)) arr = [];
        for (var i in arr) {
          var data = this.get(arr[i]);
          if (i != 'Contains' && data) ret[arr[i]] = data;
        }
        return ret;
      },
      remove: function(key) {
        localStorage.removeItem(key);
      },
      getAll: function() {
        var ret = {}
        for (var key in localStorage) {
          ret[key] = this.get(key);
        }
        return ret;
      },
      removeAll: function() {
        var stores = this.getAll();
        for (var key in stores) {
          if (key != "RememberLogin") this.remove(key);
        }
      }
    }
  });
