(function() {
    'use strict';

    var fs = require('fs');
    var gulp = require('gulp');

    var tasks = fs.readdirSync('./gulp/tasks/');

    // Ensure process ends after all Gulp tasks are finished
    gulp.on('stop', function() {
        if (!global.isWatching) {
            process.nextTick(function() {
                process.exit(0);
            });
        }
    });

    tasks.forEach(function(task) {
        require('./tasks/' + task);
    });

    gulp.task("default", ["watch"]);
})();