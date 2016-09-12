var webpack = require('webpack');

module.exports = function (config) {
    config.set({

        files: [
            './tests.bundle.js'
        ],

        preprocessors: {
            './tests.bundle.js': [ 'webpack', 'sourcemap']
        },

        frameworks: [ 'mocha' ],

        plugins: [
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-osx-reporter'
        ],

        reporters: [ 'dots', 'osx' ],

        singleRun: false,

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader: 'babel',
                        test: /\.js?$/,
                        query: {
                            presets: ['es2015'],
                            plugins: [
                                ['transform-decorators-legacy']
                            ]
                        }
                    }
                ],
            }
        }
    });
};