import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

function addWebpackMiddleware(resolver, facet, wire) {
    const webpackConfig = facet.options.webpackConfig;
    const compiler = webpack(webpackConfig);
    let target = facet.target;
    target.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
    target.use(webpackHotMiddleware(compiler));
    resolver.resolve(target);
}

export default function WebpackMiddlewarePlugin(options) {
    return {
        facets: {
            webpackMiddleware: {
                initialize: addWebpackMiddleware
            }
        }
    }
}