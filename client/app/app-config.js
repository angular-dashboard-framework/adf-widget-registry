/*jshint camelcase: false */
/* global window */
(function (anglar) {
    'use strict';

    angular.module('adf-widget-registry')
      .constant('config', {
        appTitle: 'ADF Widget Registry',
        appVersion: '0.1.0-SNAPSHOT',
        portfolioTitle: 'Widgets',
        portfolioLink: 'widgets',
        apiVersion: 1
      })
      .config(function($compileProvider) {
        if (!location.host.match(/localhost/)) {
          $compileProvider.debugInfoEnabled(false);
        }
      })

      .constant('angularMomentConfig', {
          preprocess: 'utc', // optional
          timezone: 'Europe/Rome' // optional
      })

      .config(function ($sceDelegateProvider) {
          $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.github.com/**',
            'http://www.github.com/**'
          ]);
      })

      .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
      })

      .config(function(ngDialogProvider) {
          ngDialogProvider.setDefaults({
              className: 'ngdialog-theme-default',
              plain: false,
              showClose: true,
              closeByDocument: true,
              closeByEscape: true
          });
      })

      .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/widgets', {
                templateUrl: 'app/widgets/widgets.html',
                controller: 'WidgetsCtrl',
                controllerAs: 'vm'
            })
            .when('/widgets/:name', {
                templateUrl: 'app/widgets/widgets.html',
                controller: 'WidgetsCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/widgets'
            })
      });

}(angular));
