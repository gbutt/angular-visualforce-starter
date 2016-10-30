/*
  The root component for this app.
  Angular components extend HTML by creating new elements.
  The root component can be referenced by adding the element <app></app> to the webpage.
  The name of the element matches the name of the component.
*/

(function () {
  'use strict';

  angular.module('app')
    .component('appRoot', {
      templateUrl: 'components/app-root.tpl.html',
      controller: AppController
    });

  /* @NgInject */
  function AppController(navbarService, $log) {
    var ctrl = this;

    $log.debug('You can turn off debug logging in index.html by setting appContext.debugEnabled to false');

    navbarService.onStateChange(function () {
      ctrl.updateViewTitle();
    });

    ctrl.$onInit = function () {
      ctrl.navCollapsed = true;
      ctrl.topNavs = navbarService.getTopNavs();
      ctrl.updateViewTitle();
    };

    ctrl.toggleNavigation = function (value) {
      ctrl.navCollapsed = value !== undefined ? value : !ctrl.navCollapsed;
    };

    ctrl.updateViewTitle = function () {
      ctrl.viewTitle = navbarService.getViewTitle() || ctrl.viewTitle;
      return ctrl.viewTitle;
    };

    ctrl.isActive = function (stateTitle) {
      return ctrl.viewTitle === stateTitle;
    };
  }

})();