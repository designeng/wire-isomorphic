var webpack = require('webpack');

process.env = {COMPILATION_MODE: 'client'}

module.exports = {
    context: __dirname + '/../../../../client',
    entry: {
        client    : './index.js'
    },
    output: {
        filename: __dirname + '/../../../../../public/build/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.hbs/, loader: "handlebars-template-loader", exclude: /node_modules/ },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin('COMPILATION_MODE')
    ],
    devtool: 'source-map'
}