// enables debug logging in javascript

(function () {
  'use strict';

  angular.module('app').config(['$logProvider', 'appSettings', function ($logProvider, appSettings) {
    $logProvider.debugEnabled(appSettings.debugEnabled);
  }]);
})();