/* Routing
  This module configures what we do when the url changes.
  It allows us to:
    - define links using the ui-sref directive
    - navigate using the $state service
    - pass parameters to components using the $stateParam service
 */

(function () {
  'use strict';

  angular.module('app').config(RouterConfig);

  /* @NgInject */
  function RouterConfig($stateProvider, $urlRouterProvider) {

    // Parent route
    $stateProvider.state('routes', {
      template: '<div class="container-fluid"><ui-view></ui-view></div>'
    });

    $stateProvider.state('routes.default', {
      url: '/default',
      templateUrl: 'config/routes.default.tpl.html',
      title: 'Default Route',
      topNav: true
    });

    $stateProvider.state('routes.userNotificationDemo', {
      url: '/userNotificationDemo',
      template: '<user-notification-demo></user-notification-demo>',
      title: 'User Notifications Demo',
      topNav: true
    });

    // this route does not display in the top nav.
    $stateProvider.state('routes.vfrActionDemo', {
      url: '/vfrActionDemo',
      template: '<vfr-action-demo></vfr-action-demo>',
      title: 'VFR Action Demo',
      topNav: true
    });

    // this route does not have a title.
    $stateProvider.state('routes.noTitle', {
      url: '/nonNavRoute',
      template: '<h1>I rely on the previous route title</h1>'
    });

    // configure default route.
    $urlRouterProvider.otherwise("/default");
  }
})();