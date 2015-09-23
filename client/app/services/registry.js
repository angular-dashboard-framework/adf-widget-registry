(function() {
    'use strict';

    angular.module('adf-widgets')
    .service('registryService',
      function service($http, $q, config) {

          var callConfig = {
            headers:  {
                'Accept': 'application/json'
            }
          };

          var api;
          var urls = {};

          var widgets;

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
            },
            widgets: function() {
              var service = this;
              if (widgets) {
                return $q.when(widgets);
              }
              return service.getApi()
                .then(function(response) {
                  return response;
                })
                .then(function(response) {
                  var url = response.data.widgets;
                  return service.get(url);
                })
                .then(function(response) {
                  var promises = [];
                  angular.forEach(response.data, function (widget) {
                    promises.push(service.get(widget.link));
                  });
                  return $q.all(promises)
                    .then(function(response) {
                      widgets = [];
                      angular.forEach(response, function (widget) {
                        //https://raw.githubusercontent.com/ivan-saorin/adf-widget-wysiwyg/master/registry/adf-widget-wysiwyg.png
                        //https://github.com/ivan-saorin/adf-widget-wysiwyg/registry/adf-widget-wysiwyg.png
                        console.log(widget.data);
                        var base;

                        if (widget.data.latest.homepage.indexOf('github.com') > -1) {
                          base = widget.data.latest.homepage;
                        }
                        else if (typeof widget.data.latest.repository === 'string') {
                          base = widget.data.latest.repository;
                        }
                        else {
                          base = 'http://localhost';
                        }
                        base = base.replace('git@', 'https://')
                        base = base.replace('.git', '') + '/master/registry';
                        base = base.replace('https://github.com/', 'https://raw.githubusercontent.com/')
                        widget.data.icon = base + '/' + widget.data.name + '.png';
                        widget.data.showcase = base + '/showcase.md';

                        widgets.push(widget.data);
                      });
                    return widgets;
                  })
                });
            },
            widget: function(name) {
              var service = this;
              return service.widgets()
                .then(function(widgets) {
                  for (var i = 0; i < widgets.length; i++) {
                    if (widgets[i].name === name) {
                      return widgets[i];
                    }
                  }
                  return undefined;
                });
            },
            markdown: function(url) {
              return $http.get(url);
            }
          }
      });

})();
