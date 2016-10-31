(function () {
  'use strict';

  angular.module('app')
    .factory('vfrActionFactory', VfrActionFactory);

  /* @NgInject */
  function VfrActionFactory($q, $log) {

    return {
      build: createVfrAction
    };

    function createVfrAction(config) {
      var remoteAction = config.actionName;
      var options = config.options;
      return function () {
        var deferred = $q.defer();
        var args;
        if (arguments.length) {
          args = Array.prototype.slice.apply(arguments);
        } else {
          args = [];
        }
        $log.debug('invoking action: ' + remoteAction + ' with args: ' + JSON.stringify(args) + ' and options: ' + JSON.stringify(options));
        args.splice(0, 0, remoteAction);
        args.push(function (result, event) {
          handleResult(result, event);
        });
        args.push(options);
        var Manager = Visualforce.remoting.Manager;
        Manager.invokeAction.apply(Manager, args);
        return deferred.promise;

        function handleResult(result, event) {
          $log.debug(result);
          if (event.status) {
            deferred.resolve(result);
          } else {
            deferred.reject(event);
          }
        }
      };
    }
  }
})();