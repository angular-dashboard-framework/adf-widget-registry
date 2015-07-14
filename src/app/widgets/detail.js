(function() {
    'use strict';

    angular.module('adf-widgets').controller('WidgetDetailCtrl', controller);
    controller.$inject = ['registryService', 'widget'];

    function controller(registryService, widget) {
        var vm = this;

        var imagesInfo = {
          'adf-widget-clock': {
            imagePrefix: 'adf-widget-clock',
            captions: ['Clock widget view', 'Clock widget configuration']
          },
          'adf-widget-github': {
            imagePrefix: 'adf-widget-github',
            captions: ['Github History widget view', 'Github Author widget view', 'Github widgets configuration']
          },
          'adf-widget-linklist': {
            imagePrefix: 'adf-widget-linklist',
            captions: ['Linklist widget view', 'Configuration dialog of the linklist widget']
          },
          'adf-widget-markdown': {
            imagePrefix: 'adf-widget-markdown',
            captions: ['Markdown widget view', 'Markdown widget configuration']
          },
          'adf-widget-news': {
            imagePrefix: 'adf-widget-news',
            captions: ['News widget view', 'Configuration dialog of the news widget']
          },
          'adf-widget-randommsg': {
            imagePrefix: 'adf-widget-randommsg',
            captions: ['The RandomMsg widget displaying a Douglas Adams', 'RandomMsg widget configuration']
          },
          'adf-widget-tweet': {
            imagePrefix: 'adf-widget-tweet',
            captions: ['Tweet widget view']
          },
          'adf-widget-version': {
            imagePrefix: 'adf-widget-version',
            captions: ['The version widget displaying the current version', 'Configuration of the version widget']
          },
          'adf-widget-weather': {
            imagePrefix: 'adf-widget-weather',
            captions: ['Various widgets displaying temperatures from around the Word', 'Configuration dialog of the weather widget']
          }
        }

        function injectImageInfo(widget) {
          var info = imagesInfo[widget.name];
          if (info) {
            widget.images = [];

            for (var i = 0; i < info.captions.length; i++) {
              var image = {};
              image.url = '/assets/images/widget-images/' + widget.name + '/' + info.imagePrefix + '-0' + (i+1) + '.png';
              image.caption = info.captions[i];
              widget.images.push(image);
            }

          }
          return undefined;
        }

        activate();

        function activate() {
          console.log('widget', widget);
          vm.widget = widget;
          injectImageInfo(vm.widget);
        }
    }

})();
