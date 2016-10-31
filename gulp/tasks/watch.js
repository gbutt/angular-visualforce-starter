(function () {
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');

  gulp.task('watch', ['watch:all', 'webpack-dev-server']);

  gulp.task('watch:all', ['views', 'assets'], function () {

    global.isWatching = true;

    // Scripts are automatically watched and rebundled by Webpack dev server
    gulp.watch(config.views.src, ['views']);
    gulp.watch(config.assets.indexHtml, ['assets']);

  });
})();