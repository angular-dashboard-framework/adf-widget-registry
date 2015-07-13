/* global window */
(function() {
    'use strict';

    angular.module('adf-widgets').controller('WidgetsCtrl', controller);
    controller.$inject = ['registryService'];

    function controller(registryService) {
        var vm = this;

        activate();

        function activate() {

          vm.status = 'loading';

          registryService.getApi()
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

        }
    }

})();
