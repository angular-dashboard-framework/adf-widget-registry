(function() {
    'use strict';

    angular.module('adf-widgets').service('registryService', service);
    service.$inject = ['$http', 'config'];

    function service($http, config) {

        var callConfig = {
          headers:  {
              'Accept': 'application/json'
          }
        };

        var api;
        var urls = {};

        return {
          getApi: function() {
            if (api) {
              return api;
            }
            api = $http.get('/api/v' + config.apiVersion, callConfig);
            return api;
          },
          get: function(url) {
            if (urls[url]) {
              return urls[url];
            }
            urls[url] = $http.get(url, callConfig);
            return urls[url];
          }
        }
    }

})();
