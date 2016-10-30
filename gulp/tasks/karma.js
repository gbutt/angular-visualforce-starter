(function () {
  'use strict';

  var config = require('../config');
  var path = require('path');
  var gulp = require('gulp');
  var util = require('gulp-util');
  var Server = require('karma').Server;

  gulp.task('karma', function (cb) {

    var karmaConfig = {
      configFile: path.resolve(global.appRoot, config.test.karma),
      singleRun: true,
      reporters: ['dots', 'coverage'],
      coverageReporter: {
        dir: 'coverage/',
        reporters: [{
          type: 'text-summary'
        }, {
          type: 'html'
        }],
      },
    };

    // // we enforce code coverage on deployments
    // if (!util.env.nocheck) {
    //   karmaConfig.coverageReporter.check = {
    //     global: {
    //       statements: 95,
    //       branches: 90,
    //       functions: 95,
    //       lines: 95
    //     },
    //     each: {
    //       statements: 75,
    //       branches: 50,
    //       functions: 75,
    //       lines: 75
    //     }
    //   };
    // }

    new Server(karmaConfig, cb).start();

  });

  gulp.task('tdd', function (cb) {

    new Server({
      configFile: path.resolve(global.appRoot, config.test.karma),
      singleRun: false,
      reporters: ['dots'],
    }, cb).start();

  });
})();