import webpack from 'webpack';

function webpackCompile(resolver, compDef, wire) {
    const webpackConfig = compDef.options.webpackConfig;

    const compiler = webpack(webpackConfig);

    compiler.run(function(err, stats) {
        if(err) {
            resolver.reject(err);
        } else {
            // TODO: here should be a relative path to compiled script
            // resolver.resolve(.......);

            // noop:
            resolver.resolve('/js/webpack_compiled_script.js');
        }
    });
}

export default function webpackCompilePlugin(options) {
    return {
        factories: {
            webpackCompile
        }
    }
}