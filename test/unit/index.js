// load 3rd party dependencies
require('../../src/vendor');
// load testing mocks
require('../../src/mocks');
// load test fixtures
require('./fixtures/appContext');
// load app
require('../../src/app');
// load anguar mocks library
require('angular-mocks');


// This gets replaced by karma webpack with the updated files on rebuild
var __karmaWebpackManifest__ = [];

// require all modules ending in ".spec.js" from the src/app directory
var testsContext = require.context('../../src/js', true, /\.spec\.js$/);

function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

var runnable = testsContext.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);