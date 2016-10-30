(function () {
    'use strict';

    var config = require('../config');
    var gulp = require('gulp');
    var merge = require('merge-stream');
    var templateCache = require('gulp-angular-templatecache');

    // Views task
    gulp.task('views', function () {
        console.log('compiling views');

        // Process any other view files from app/views
        var views = gulp.src(config.views.src)
            .pipe(templateCache('templates.generated.js', {
                standalone: true
            }))
            .pipe(gulp.dest(config.views.dest));

        return views;

    });

    gulp.task('assets', function () {
        console.log('compiling assets');
        // Put our index.html in the dist folder
        var indexFile = gulp.src([config.assets.indexHtml])
            .pipe(gulp.dest(config.buildDir));
        return indexFile;
    });
})();