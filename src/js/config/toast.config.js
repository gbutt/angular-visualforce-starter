// Default configuration for user notification messages

(function () {
  'use strict';

  angular.module('app').config(toastConfig);

  toastConfig.$inject = ['ngToastProvider'];
  /* @NgInject */
  function toastConfig(ngToastProvider) {
    ngToastProvider.configure({
      combineDuplications: true,
      dismissOnClick: true,
      dismissButton: true,
      horizontalPosition: 'center',
      animation: 'fade',
    });
  }

})();