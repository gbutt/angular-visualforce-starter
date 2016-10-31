(function () {
  'use strict';

  angular.module('app')
    .service('userNotificationService', UserNotificationService);

  /* @NgInject */
  function UserNotificationService(ngToast) {
    var svc = this;

    var defaultErrorMessage = 'An unexpected error occurred';

    svc.success = function (message) {
      ngToast.create(message);
    };

    svc.error = function (message) {
      if (!message) {
        message = defaultErrorMessage;
      }
      ngToast.create({
        content: message,
        className: 'danger',
        dismissOnTimeout: false
      });
    };
  }
})();