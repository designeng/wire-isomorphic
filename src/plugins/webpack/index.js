import webpack from 'webpack';

function webpackCompile(resolver, compDef, wire) {
    const webpackConfig = compDef.options.webpackConfig;

    const compiler = webpack(webpackConfig);

    compiler.run(function(err, stats) {
        console.log('compiled......', err, stats);
        
        if(err) {
            resolver.reject(err);
        } else {
            resolver.resolve(stats);
        }
    });

    // resolver.resolve('webpack noop');
}

export default function webpackCompilePlugin(options) {
    return {
        factories: {
            webpackCompile
        }
    }
}