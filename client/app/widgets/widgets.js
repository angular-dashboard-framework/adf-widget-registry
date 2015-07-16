/* global window */
(function() {
    'use strict';

    angular.module('adf-widgets').controller('WidgetsCtrl',
      function controller(registryService, $routeParams, ngDialog, $location) {
          var vm = this;

          activate();

          function findWidgetUrl(name) {
            for (var i = 0; i < vm.widgets.length; i++) {
              var w = vm.widgets[i];
              if (w.name === name) {
                return w;
              }
            }
            return undefined;
          }

          function activate() {

            vm.status = 'loading';

            var promiseChain = registryService.getApi()
              .then(function(response) {
                return response;
              })
              .then(function(response) {
                var url = response.data.widgets;
                return registryService.get(url);
              })
              .then(function(response) {
                vm.status = 'loaded';
                vm.widgets = response.data;
              }, function(reason) {
                vm.status = 'error';
                vm.error = reason;
              });


            if ($routeParams.name) {
              ngDialog.open({
                template: 'app/widgets/detail.html',
                controller: 'WidgetDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                  widget: function() {
                    return promiseChain
                      .then(function() {
                        var widget = findWidgetUrl($routeParams.name);
                        return registryService.get(widget.link);
                      })
                      .then(function (response) {
                        return response.data;
                      });
                  }
                }
              })
              .closePromise.then(function (data) {
                  console.log(data.id + ' has been dismissed.');
                  $location.path('/#/widgets');
              });
            }
            else {
              promiseChain
                .then(function (response) {
                });              
            }
          }

          vm.openModal = function(widget) {

          }
      });

})();
