(function (global) {
  'use strict';

  global.Visualforce = {
    remoting: {
      Manager: {
        invokeAction: invokeActionWithTimeout
      }
    }
  };

  var mockedActions = require('./mockedVfrActions');
  var mockConfig = buildMockConfig();

  function buildMockConfig() {
    var mockConfig = global.vfrMockConfig || {
      lotsOfErrors: false,
      latencyinMillis: 500
    };
    if (mockConfig.lotsOfErrors) {
      console.warn('Lot of errors mode enabled');
    }
    return mockConfig;
  }

  function invokeActionWithTimeout() {
    var action, args, handleResult, options;
    action = arguments[0];
    handleResult = arguments[arguments.length - 2];
    options = arguments[arguments.length - 1];
    if (arguments.length > 3) {
      args = Array.prototype.slice.apply(arguments).slice(1, arguments.length - 2);
    }

    global.setTimeout(function () {
      if (mockConfig.lotsOfErrors && new Date().getTime() % 2 === 1) {
        handleResult(undefined, {
          message: 'lots of errors'
        });
      } else {
        invokeAction(action, args, handleResult, options);
      }
    }, mockConfig.latencyinMillis);
  }

  function invokeAction(action, args, handleResult, options) {
    var resultGenerator = mockedActions[action];
    if (resultGenerator) {
      handleSuccess(resultGenerator(args), handleResult);
    } else {
      handleNoActionDefined(action, handleResult);
    }
  }

  function handleSuccess(result, handleResult) {
    handleResult(result, {
      status: 'Success'
    });
  }

  function handleNoActionDefined(action, handleResult) {
    handleResult(undefined, {
      message: 'No action defined for ' + action
    });
  }

})(window);