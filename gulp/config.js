(function () {
  'use strict';
  var path = require('path');
  var extend = require('util')._extend;

  var config = {
    srcDir: './src',
    appDir: './src/js',
    buildDir: './build',
    browserPort: 3000,
  };
  var webpack = {
    config: require("./webpack.config.js"),
    devServer: {
      contentBase: config.buildDir,
      https: true,
      inline: true,
      stats: {
        colors: true
      }
    }
  };
  webpack.config.entry.app = path.join(global.appRoot, config.srcDir, 'app.js');
  webpack.config.entry.vendor = path.join(global.appRoot, config.srcDir, 'vendor.js');
  webpack.config.entry.mocks = path.join(global.appRoot, config.srcDir, 'mocks.js');
  webpack.config.entry.styles = path.join(global.appRoot, config.srcDir, 'styles.js');
  webpack.config.output.path = path.join(global.appRoot, config.buildDir);

  var assets = {
    indexHtml: path.join(config.srcDir, 'index.html')
  };

  var views = {
    src: path.join(config.appDir, '**/*.html'),
    dest: config.appDir
  };

  var test = {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  };

  var deploy = {
    src: path.join('dist', 'resource-bundles'),
    dest: path.join('dist', 'src'),
    fileName: 'ngStarter.resource',
    //credFile: 'mySalesforceConnection.json'
  };

  module.exports = extend(config, {
    webpack: webpack,
    views: views,
    assets: assets,
    test: test,
    deploy: deploy,
  });
})();