(function () {
  'use strict';
  var path = require('path');

  var fullWebpackConfig = require('../gulp/webpack.config.js');
  var testWebpackConfig = {
    module: fullWebpackConfig.module,
    resolve: fullWebpackConfig.resolve,
  };
  testWebpackConfig.resolve.alias.test = path.resolve(global.appRoot, 'test');
  testWebpackConfig.resolve.alias.testData = path.resolve(global.appRoot, 'src/js/mocks/data');
  testWebpackConfig.module.postLoaders.push(
    // instrument only testing sources with Istanbul
    {
      test: /\.js$/,
      include: path.resolve('./src/js/'),
      exclude: [/templates\.generated\.js$/, /\.spec\.js$/, /mocks/],
      loader: 'istanbul-instrumenter-loader'
    }
  );
  testWebpackConfig.devtool = 'cheap-module-source-map';

  module.exports = function (config) {
    config.set({

      basePath: '../',

      singleRun: true,

      frameworks: ['jasmine'],

      files: [
        'test/unit/index.js'
      ],

      preprocessors: {
        'test/unit/index.js': ['webpack']
      },

      browsers: ['PhantomJS'],

      autoWatch: true,

      webpack: testWebpackConfig,

      webpackMiddleware: {
        noInfo: true
      }
    });
  }
})();