(function () {
  'use strict';
  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var webpack = require("webpack");
  var WebpackDevServer = require("webpack-dev-server");
  var config = require('../config');
  var webpackConfig = config.webpack.config;

  // Production build
  gulp.task("build", ["webpack:build"]);

  gulp.task("build:dev", ["webpack:build:dev"]);

  gulp.task("webpack:build:dev", ["views", "assets"], function (callback) {
    // modify some webpack config options
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = "sourcemap";
    myDevConfig.debug = true;

    // run webpack
    webpack(myDevConfig).run(function (err, stats) {
      if (err) throw new gutil.PluginError("webpack:build:dev", err);
      gutil.log("[webpack:build:dev]", stats.toString({
        colors: true
      }));
      callback();
    });
  });

  gulp.task("webpack:build", ["views", "assets"], function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
      if (err) throw new gutil.PluginError("webpack:build", err);
      gutil.log("[webpack:build]", stats.toString({
        colors: true
      }));
      callback();
    });
  });

  gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), config.webpack.devServer)
      .listen(config.browserPort, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "https://localhost:" + config.browserPort + "/index.html");
      });
  });
})();