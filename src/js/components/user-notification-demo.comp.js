(function () {
  'use strict';

  angular.module('app')
    .component('userNotificationDemo', {
      templateUrl: 'components/user-notification-demo.tpl.html',
      controller: UserNotificationDemoComponent
    });

  /* @NgInject */
  function UserNotificationDemoComponent(userNotificationService) {
    var ctrl = this;

    ctrl.demoSuccess = function () {
      userNotificationService.success(ctrl.message || 'Default Success Message');
    };

    ctrl.demoError = function () {
      userNotificationService.error(ctrl.message);
    };
  }
})();