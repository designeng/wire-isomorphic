// example webpack config - remove later

var path = require('path');
var webpack = require('webpack');

var specLoader = require('wire-decorators/webpack/loaders/specLoader');

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: [
            // 'webpack-hot-middleware/client?reload=true',
            './client/admin/main.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'public/webpack/build/admin'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {   
                test: /\.spec\.js$/,
                loaders: specLoader,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map',
    node: {
        fs: "empty" // avoids error messages
    }
}