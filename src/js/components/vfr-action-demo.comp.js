(function () {
  'use strict';

  angular.module('app')
    .component('vfrActionDemo', {
      templateUrl: 'components/vfr-action-demo.tpl.html',
      controller: VfrActionDemoComponent
    });

  /* @NgInject */
  function VfrActionDemoComponent(vfrActionFactory, appSettings, $log, userNotificationService, vfrActions) {
    var ctrl = this;

    if (!appSettings.debugEnabled) {
      $log.info('Turn on debug logging to see vfr actions in the console');
    }

    var myRemoteActionVfr = vfrActionFactory.build(vfrActions.myRemoteAction);
    var anotherRemoteActionVfr = vfrActionFactory.build(vfrActions.anotherRemoteAction);

    ctrl.actionWithoutArgs = function () {
      myRemoteActionVfr()
        .then(printResult)
        .catch(handleError);
    };

    ctrl.actionWithArgs = function () {
      var person = {
        name: 'Jeffrey',
        hasOptedOutOfEmail: false
      };
      var account = {
        Name: 'The Big Inc.'
      };
      anotherRemoteActionVfr(account, person)
        .then(printResult)
        .catch(handleError);
    };

    function printResult(result) {
      ctrl.result = result;
    }

    function handleError(result) {
      userNotificationService.error(result.message);
    }
  }
})();