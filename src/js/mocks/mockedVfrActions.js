(function (global) {
  'use strict';

  require('angular-vf-remote-actions/dist/vfrMock');

  global.vfrMockConfig = {
    lotsOfErrors: false,
    latencyinMillis: 500,
    invokeActionHandler: function (args) {
      switch (args.method) {
        case 'myRemoteAction':
          args.handleSuccess(myRemoteAction());
          break;
        case 'anotherRemoteAction':
          args.handleSuccess(anotherRemoteAction(args.parameters));
          break;
        default:
          args.handleUndefined();
      }
    }
  };

  var mockData = {
    myRemoteAction: require('./data/myRemoteAction.json'),
    anotherRemoteAction: require('./data/anotherRemoteAction.json')
  }

  function myRemoteAction() {
    return angular.copy(mockData.myRemoteAction);
  }

  function anotherRemoteAction(args) {
    var result = angular.copy(mockData.anotherRemoteAction);
    result.data = angular.copy(args);
    return result;
  }

})(window);