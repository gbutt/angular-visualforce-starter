(function () {
    'use strict';

    var config = require('../config');
    var gulp = require('gulp');
    var del = require('del');
    var util = require('gulp-util');

    gulp.task('clean', function () {
        var deleteDirs = [config.buildDir, 'dist', 'coverage'];
        if (!!util.env.all) {
            deleteDirs.push('node_modules');
        }
        return del(deleteDirs);
    });
})();