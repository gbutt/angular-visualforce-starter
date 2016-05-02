(function() {
    'use strict';
    var path = require('path');

    module.exports = function(config) {
        config.set({

            basePath: '../',

            singleRun: true,

            frameworks: ['jasmine'],

            files: [
                'test/unit/index.js'
            ],

            preprocessors: {
                'test/unit/index.js': ['webpack']
            },

            browsers: ['PhantomJS2'],

            reporters: ['dots', 'coverage'],
            coverageReporter: {
                dir: 'coverage/',
                reporters: [{
                    type: 'text-summary'
                }, {
                    type: 'html'
                }]
            },

            autoWatch: true,

            webpack: {
                resolve: {
                    root: path.resolve(global.appRoot, './src'),
                    alias: {
                        test: path.resolve(global.appRoot, './test')
                    }
                },
                module: {
                    postLoaders: [
                        // instrument only testing sources with Istanbul
                        {
                            test: /\.js$/,
                            include: path.resolve('./src/app/'),
                            exclude: [/index\.js$/, /templates\.js$/],
                            loader: 'istanbul-instrumenter-loader'
                        }
                    ]
                }
            },

            webpackMiddleware: {
                noInfo: true
            }
        });
    }
})();