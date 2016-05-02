(function() {
    'use strict';

    var config = require('../config');
    var gulp = require('gulp');

    gulp.task('watch', ['watch-all', 'webpack-dev-server']);

    gulp.task('watch-all', function() {

        global.isWatching = true;

        // Scripts are automatically watched and rebundled by Watchify inside Browserify task
        // gulp.watch(config.scripts.src, ['eslint']);
        // gulp.watch(config.styles.src, ['styles']);
        // gulp.watch(config.images.src, ['images']);
        // gulp.watch(config.fonts.src, ['fonts']);
        gulp.watch(config.views.watch, ['views']);

    });
})();