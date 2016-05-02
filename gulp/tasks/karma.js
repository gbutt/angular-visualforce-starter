(function() {
    'use strict';

    var config = require('../config');
    var path = require('path');
    var gulp = require('gulp');
    var Server = require('karma').Server;

    gulp.task('karma', ['views'], function(cb) {

        new Server({
            configFile: path.resolve(global.appRoot, config.test.karma),
            singleRun: true
        }, cb).start();

    });

    gulp.task('tdd', ['views'], function(cb) {

        new Server({
            configFile: path.resolve(global.appRoot, config.test.karma),
            singleRun: false
        }, cb).start();

    });
})();