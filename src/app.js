/* This is the main entry point for our app.
 It will do the following tasks:
  1) load local modules
  2) create the root angular module with dependencies
  3) load app configurations
  4) load the `app` component
*/

(function () {
  'use strict';

  // load local modules
  require('./js/templates.generated');

  var vendorModules = [
    'ngSanitize',
    'ngToast',
    'ui.bootstrap',
    'ui.router',
    'vfrAction',
  ];
  var localModules = ['templates'];

  // create root module
  angular.module('app', vendorModules.concat(localModules));

  require('./js/config');
  require('./js/components');
  require('./js/services');

})();