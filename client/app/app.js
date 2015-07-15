/* global window */

(function (console, angular) {
    'use strict';

  angular.module('adf-widget-registry')

    .directive('pageScroll', function () {
        return function (scope, element, attrs) {
            element.find('a').on('click', function(event) {
              var $anchor = $(this);
              var idx = $anchor.attr('href').indexOf('#');
              var id = $anchor.attr('href').substring(idx);
              var el = angular.element(id);
              if (el) {
                console.log(el, el.offset());
                angular.element('html, body').stop().animate({
                    scrollTop: el.offset().top - 60
                }, 1500, 'easeInOutExpo');
              }
              event.preventDefault();
            });
          scope.$on('$destroy', function() {
            element.find('a').off('click');
          });
        }
    })

    .controller('MainCtrl', function($scope, config) {

      $scope.enterPageClass = 'bounceIn';
      $scope.leavePageClass = 'bounceOut';

      $scope.config = config;
    });

})(console, angular);
