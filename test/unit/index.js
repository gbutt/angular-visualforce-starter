require('app/vendor');
require('app/templates');
require('app/index');
require('angular-mocks');

// require all `test/components/**/index.js`
var testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);