import webpack from 'webpack';

function webpackCompile(resolver, compDef, wire) {
    const webpackConfig = compDef.options.webpackConfig;
    // const compiler = webpack(webpackConfig);
    
    resolver.resolve('webpackCompiled script here');
}

export default function webpackCompilePlugin(options) {
    return {
        factories: {
            webpackCompile
        }
    }
}