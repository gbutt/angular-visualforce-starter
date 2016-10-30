// Decorates the $state service so we can track the previous state

(function () {
  'use strict';

  angular.module('app')
    .decorator('$state', $stateDecorator);

  /* @NgInject */
  function $stateDecorator($delegate, $rootScope) {
    var $state = $delegate;
    $state.previous = undefined;
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $state.previous = fromState;
    });
    return $state;
  }
})();