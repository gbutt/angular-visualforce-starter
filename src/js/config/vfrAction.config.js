angular.module('app').config(['VfrActionProvider', function (VfrActionProvider) {
  // VfrActionProvider.defaultNamespace('gbutt'); // developer orgs only
  VfrActionProvider.defaultController('ngStarterController');
  VfrActionProvider.defaultConfiguration({
    timeout: 10000,
    escape: false
  });

  VfrActionProvider.actions({
    anotherRemoteAction: {
      configuration: {
        timeout: 200,
        escape: true
      }
    }
  });

}]);