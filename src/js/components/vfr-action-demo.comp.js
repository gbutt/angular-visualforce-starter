(function () {
  'use strict';

  angular.module('app')
    .component('vfrActionDemo', {
      templateUrl: 'components/vfr-action-demo.tpl.html',
      controller: VfrActionDemoComponent
    });

  /* @NgInject */
  function VfrActionDemoComponent(VfrAction, $log, userNotificationService) {
    var ctrl = this;

    var myRemoteActionVfr = new VfrAction('myRemoteAction');
    var anotherRemoteActionVfr = new VfrAction('anotherRemoteAction');

    ctrl.actionWithoutArgs = function () {
      myRemoteActionVfr.invoke()
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
      anotherRemoteActionVfr.invoke(account, person)
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