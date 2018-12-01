'use strict';

/**
 * @ngdoc service
 * @name dataStructureProjectApp.services
 * @description
 * # services
 * Service in the dataStructureProjectApp.
 */
angular.module('dataStructureProjectApp')
	.service('_sweet', function(){
		return swal;
	})
	.service('_dirHref', function(){
		return {
			go: function(urlPath){
				var host = location.origin;
	      var url = host + location.pathname + urlPath;
	      url = url.replace("#", "#!");
	      location.href = url;
	    }
		}
	})
	.service('_api', function(_http){
		return {
			getKelas: function(){
				return _http.get(api + "/data-structure-ws/rest/kelas/all");
			},
			getSiswaKelas: function(kelas){
				return _http.post(api + "/data-structure-ws/rest/siswa/find-by-kelas", {
					search: {
						kelas: kelas
					}
				});
			}
		}
	})
  .service('_http', function ($q, $http) {
		return {
			ajax: function (url, data, method, headers) {
				var q = $q.defer();
				$http({
					method: method,
					url: url,
					timeout: 120 * 1000,
					headers: headers || {},
					data: data || {}
				}).then(function (succ) {
					q.resolve(succ);
				}, function (err) {
					q.reject(err);
				});
				var log = JSON.stringify(data || {});
				log = log.length > 300 ? "Too long parameters" : log;
				console.debug(sprintf('_http Accessing %s with parameter %s', url, log));
				return q.promise;
			},
			post: function (url, data, headers) {
				return this.ajax(url, data, "post", headers);
			},
			get: function (url, data, headers) {
				return this.ajax(url, data, "get", headers);
			}
		}
	})
	.service('_store', function () {
		return {
			put: function (key, value) {
				if (typeof value == 'object') value = JSON.stringify(value);
				localStorage.setItem(key, value);
			},
			putObj: function (obj) {
				if (typeof obj != 'object') obj = {};
				for (var key in obj) {
					this.put(key, obj[key]);
				}
			},
			get: function (key) {
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
			getObj: function (arr) {
				var ret = {}
				if (!Array.isArray(arr)) arr = [];
				for (var i in arr) {
					var data = this.get(arr[i]);
					if (i != 'Contains' && data) ret[arr[i]] = data;
				}
				return ret;
			},
			remove: function (key) {
				localStorage.removeItem(key);
			},
			getAll: function () {
				var ret = {}
				for (var key in localStorage) {
					ret[key] = this.get(key);
				}
				return ret;
			},
			removeAll: function () {
				var stores = this.getAll();
				for (var key in stores) {
					if (key != "RememberLogin") this.remove(key);
				}
			}
		}
	});
