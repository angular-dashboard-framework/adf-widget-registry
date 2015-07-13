/* global window */

(function (angular) {
    'use strict';

  angular.module('adf-widgets', [])

    .controller('WidgetsCtrl', function($scope, registry) {
      $scope.status = 'loading';
      registry.getApi()
        .then(function(response) {
          return response;
        })
        .then(function(response) {
          var url = response.data.widgets;
          return registry.get(url);
        })
        .then(function(response) {
          $scope.status = 'loaded';
          $scope.widgets = response.data;
        }, function(reason) {
          $scope.status = 'error';
          $scope.error = reason;
        });

    })
    .controller('WidgetDetailCtrl', function($scope) {


    });

})(angular);
