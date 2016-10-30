(function () {
  'use strict';

  angular.module('app')
    .service('navbarService', NavbarService);

  /* @NgInject */
  function NavbarService($state, $rootScope) {
    var svc = this;

    svc.getTopNavs = function () {
      var topNavs = [];
      var allStates = $state.get();
      allStates.forEach(function (state) {
        if (state.topNav === true) {
          topNavs.push({
            name: state.name,
            title: state.title
          });
        }
      });
      return topNavs;
    };

    svc.getViewTitle = function () {
      return $state.current.title;
    };

    svc.onStateChange = function (handler) {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        handler();
      });
    };
  }
})();