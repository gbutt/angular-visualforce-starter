(function() {
    'use strict';
    var path = require('path');
    var extend = require('util')._extend;

    var config = {
        srcDir: './src',
        appDir: './src/app',
        buildDir: './build',
        browserPort: 3000,
    };
    var webpack = {
        config: require("../webpack.config.js"),
        devServer: {
            contentBase: config.srcDir,
            inline: true,
            stats: {
                colors: true
            }
        }
    };
    webpack.config.entry.app = config.appDir;
    webpack.config.entry.templates = path.join(global.appRoot, config.appDir, 'templates.js');
    webpack.config.entry.vendor = path.join(global.appRoot, config.appDir, 'vendor.js');
    webpack.config.output.path = path.join(global.appRoot, config.buildDir);

    var views = {
        index: path.join(config.srcDir, 'index.html'),
        src: path.join(config.appDir, '**/*.html'),
        dest: config.appDir,
        watch: path.join(config.srcDir, '**/*.html')
    };

    var test = {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    };

    module.exports = extend(config, {
        webpack: webpack,
        views: views,
        test: test,
    });

    // module.exports = {

    //     browserPort: 3000,
    //     UIPort: 3001,
    //     testPort: 3002,

    //     sourceDir: './app/',
    //     buildDir: './build/',

    //     styles: {
    //         src: 'app/styles/**/*.scss',
    //         dest: 'build/css',
    //         prodSourcemap: false,
    //         sassIncludePaths: []
    //     },

    //     scripts: {
    //         src: 'app/js/**/*.js',
    //         dest: 'build/js',
    //         test: 'test/**/*.js',
    //         gulp: 'gulp/**/*.js'
    //     },

    //     images: {
    //         src: 'app/images/**/*',
    //         dest: 'build/images'
    //     },

    //     fonts: {
    //         src: ['app/fonts/**/*'],
    //         dest: 'build/fonts'
    //     },

    //     assetExtensions: [
    //         'js',
    //         'css',
    //         'png',
    //         'jpe?g',
    //         'gif',
    //         'svg',
    //         'eot',
    //         'otf',
    //         'ttc',
    //         'ttf',
    //         'woff2?'
    //     ],

    //     views: {
    //         index: 'app/index.html',
    //         src: 'app/views/**/*.html',
    //         dest: 'app/js'
    //     },

    //     gzip: {
    //         src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    //         dest: 'build/',
    //         options: {}
    //     },

    //     browserify: {
    //         bundleName: 'main.js',
    //         prodSourcemap: true
    //     },

    //     test: {
    //         karma: 'test/karma.conf.js',
    //         protractor: 'test/protractor.conf.js'
    //     },

    //     deploy: {
    //         fileName: 'DomusPacisAssets.resource',
    //         basePath: '..'
    //     },

    //     init: function() {
    //         // views
    //         this.views.watch = [
    //             this.views.index,
    //             this.views.src
    //         ];

    //         // deploy
    //         var deployResourceBundle = this.deploy.basePath + '/resource-bundles/' + this.deploy.fileName;
    //         if (!this.deploy.scripts) {
    //             this.deploy.scripts = deployResourceBundle + '/js';
    //         }
    //         if (!this.deploy.styles) {
    //             this.deploy.styles = deployResourceBundle + '/css';
    //         }
    //         if (!this.deploy.src) {
    //             this.deploy.src = deployResourceBundle + '/**/*';
    //         }
    //         if (!this.deploy.dest) {
    //             this.deploy.dest = this.deploy.basePath + '/src';
    //         }

    //         return this;
    //     }

    // }.init();
})();