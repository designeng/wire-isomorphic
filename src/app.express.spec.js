import wireDebugPlugin from 'essential-wire/source/debug';
import expressAppPlugin from './plugins/express/application';
import cleanCookieMiddlewarePlugin from './plugins/express/cookie/clean';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

import staticAssetsPlugin from './plugins/express/static/index';
import notFoundMiddlewarePlugin from './plugins/express/404';

import partials from './partials';
import helpers from './utils/handlebars/helpers';

import routes from './routes';
import specs from './specs';

import showNotFoundPage from './utils/express/showNotFoundPage';

export default {
    $plugins: [
        // wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin,
        staticAssetsPlugin,
        notFoundMiddlewarePlugin,
    ],

    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: routes,
            specs: specs,
            specSource: specs._specSource,
            before: (req, res, next) => {
                next();
            },
            // TODO: 404 handler should be in separate middleware
            after: showNotFoundPage,
        },
        static: {
            dir: './public'
        },
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true,
            naughtSupport   : true
        }
    }
}