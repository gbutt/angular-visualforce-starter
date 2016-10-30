(function () {
  'use strict';

  var mockData = {
    myRemoteAction: require('./data/myRemoteAction.json'),
    anotherRemoteAction: require('./data/anotherRemoteAction.json')
  }

  var mockedActions = {
    'ngStarterController.myRemoteAction': myRemoteAction,
    'ngStarterController.anotherRemoteAction': anotherRemoteAction
  };

  function myRemoteAction() {
    return angular.copy(mockData.myRemoteAction);
  }

  function anotherRemoteAction(args) {
    var result = angular.copy(mockData.anotherRemoteAction);
    result.data = angular.copy(args);
    return result;
  }


  module.exports = mockedActions;
})();