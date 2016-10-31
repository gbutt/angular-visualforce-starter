(function () {
  'use strict';

  var packageNamespace; // = 'gbutt'; // developer orgs only
  var vfrController = 'ngStarterController';
  var actionPrefix = (packageNamespace ? packageNamespace + '.' : '') + vfrController;

  var defaultOptions = {
    timeout: 10000,
    escape: false
  };

  var vfrActionConfig = {
    myRemoteAction: {
      actionName: actionPrefix + '.myRemoteAction'
    },
    anotherRemoteAction: {
      actionName: actionPrefix + '.anotherRemoteAction',
      options: {
        timeout: 200,
        escape: true
      }
    }
  };

  angular.forEach(vfrActionConfig, function (action) {
    if (!action.options) {
      action.options = defaultOptions;
    }
  });

  angular.module('app').constant('vfrActions', vfrActionConfig);
})();