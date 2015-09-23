(function() {
    'use strict';

    angular.module('adf-widgets').controller('WidgetDetailCtrl',
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
            },
            'adf-widget-wysiwyg': {
              imagePrefix: 'adf-widget-wysiwyg',
              captions: ['The WISIWYG widget in action', 'Configuration dialog of the WYSIWYG widget']
            }
          }

          activate();

          function activate() {
            console.log('widget', widget);

            registryService.markdown(widget.showcase)
              .then(function(response) {
                widget.markdown = response.data;
                vm.widget = widget;
              },function(response) {
                vm.widget = widget;
              });
          }
      });

})();
