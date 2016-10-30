// appSettings and userContext constants provide configuration for the app
(function () {
  'use strict';

  var appSettings = angular.copy(window.appContext);
  angular.module('app').constant('appSettings', appSettings);

})();