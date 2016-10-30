(function () {
  'use strict';

  var config = require('../config');
  var gulp = require('gulp');
  var runSequence = require('run-sequence');
  var fs = require('fs');
  var path = require('path');
  var zip = require('gulp-zip');
  var file = require('gulp-file');
  var through2 = require('through2');
  var jsforce = require('jsforce');
  var del = require('del');
  var prompt = require('gulp-prompt');
  var util = require('gulp-util');

  var conn;

  var deployDir = 'dist';

  gulp.task('deploy', ['build'], function (cb) {
    // runSequence('karma', 'deploy:prompt', 'deploy:sf', cb);
    runSequence('deploy:prompt', 'deploy:sf', cb);
  });

  gulp.task('deploy:dev', ['build:dev'], function (cb) {
    // runSequence('karma', 'deploy:prompt', 'deploy:sf', cb);
    runSequence('deploy:prompt', 'deploy:sf', cb);
  });

  gulp.task('deploy:clean', function () {
    return del([deployDir]);
  });

  gulp.task('deploy:prompt', function (cb) {
    if (!!util.env.noprompt) {
      var sfconfig = detectCredentials();
      if (sfconfig) {
        conn = new jsforce.Connection(sfconfig);
        cb();
        return;
      }
    }

    console.log('Gathering SF credentials');
    gulp.src('package.json')
      .pipe(prompt.prompt([{
        type: 'checkbox',
        name: 'server',
        message: 'Server',
        choices: ['test', 'login']
      }, {
        type: 'input',
        name: 'username',
        message: 'Username'
      }, {
        type: 'password',
        name: 'password',
        message: 'Password'
      }], function (res) {
        var loginUrl = 'https://test.salesforce.com';
        if (res.server[0] === 'login') {
          loginUrl = 'https://login.salesforce.com';
        }
        conn = new jsforce.Connection({
          loginUrl: loginUrl
        });
        conn.login(res.username, res.password, function (err, res) {
          if (err) {
            console.error('Login failure.');
            cb(err);
          } else {
            console.log('Login successful.');
            cb();
          }
        });
      }));
  });

  function detectCredentials() {
    if (fs.existsSync(config.deploy.credFile)) {
      console.log('Using session from ' + path.resolve(config.deploy.credFile));
      return JSON.parse(fs.readFileSync(config.deploy.credFile));
    }
    return undefined;
  }

  gulp.task('deploy:prepare', ['deploy:clean'], function (cb) {
    runSequence('deploy:copy', 'deploy:zip', cb);
  });

  gulp.task('deploy:copy', ['deploy:copy:js', 'deploy:copy:css']);

  gulp.task('deploy:copy:js', function () {
    return gulp.src([
        path.join(config.buildDir, '*.js'),
        path.join(config.buildDir, '*.js.map'),
        '!' + path.join(config.buildDir, 'mocks.js'),
        '!' + path.join(config.buildDir, 'styles.js')
      ], {
        base: config.buildDir
      })
      .pipe(gulp.dest(path.join(config.deploy.src, config.deploy.fileName, 'js')));
  });

  gulp.task('deploy:copy:css', function () {
    return gulp.src([
        path.join(config.buildDir, '**/*.css'),
        path.join(config.buildDir, '**/*.css.map')
      ], {
        base: config.buildDir
      })
      .pipe(gulp.dest(path.join(config.deploy.src, config.deploy.fileName, 'styles/css')));
  });

  gulp.task('deploy:zip', function () {
    return gulp.src(
        path.join(config.deploy.src, config.deploy.fileName, '**/*')
      )
      .pipe(zip(config.deploy.fileName))
      .pipe(gulp.dest(path.join(config.deploy.dest, 'staticresources')));
  });

  var packageConfig = {
    xml: {
      fileName: path.join('src', 'package.xml'),
      contents: '<?xml version="1.0" encoding="UTF-8"?>' +
        '<Package xmlns="http://soap.sforce.com/2006/04/metadata">' +
        '<types>' +
        '<members>*</members>' +
        '<name>StaticResource</name>' +
        '</types>' +
        '<version>34.0</version>' +
        '</Package>'
    },
    meta: {
      fileName: path.join('src', 'staticresources', config.deploy.fileName + '-meta.xml'),
      contents: '<?xml version="1.0" encoding="UTF-8"?>' +
        '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">' +
        '<cacheControl>Public</cacheControl>' +
        '<contentType>application/zip</contentType>' +
        '<description></description>' +
        '</StaticResource>'
    }
  };

  gulp.task('deploy:sf', ['deploy:prepare'], function () {
    return gulp.src([
        path.join(config.deploy.dest, 'staticresources', config.deploy.fileName),
      ], {
        base: path.join(config.deploy.dest, '../')
      })
      .pipe(file(packageConfig.xml.fileName, packageConfig.xml.contents))
      .pipe(file(packageConfig.meta.fileName, packageConfig.meta.contents))
      .pipe(gulp.dest('dist'))
      .pipe(zip('pkg.zip'))

    .pipe(through2.obj(function (file, enc, callback) {
      conn.metadata.pollTimeout = 60000;
      conn.metadata.deploy(file.contents, {
          allowMissingFiles: true
        }).complete({
          details: true
        })
        .then(function (res) {
          if (!res.success) {
            console.error(res.details.componentFailures);
            return callback(new Error('Deploy failed.'));
          }
          callback();
        }, function (err) {
          console.error(err);
          callback(err);
        });
    }));

  });

})();