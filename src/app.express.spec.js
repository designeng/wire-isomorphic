import wireDebugPlugin from 'essential-wire/source/debug';
import expressAppPlugin from './plugins/express/application';
import cleanCookieMiddlewarePlugin from './plugins/express/cookie/clean';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import mongoExpressPlugin from './plugins/mongo';

import staticAssetsPlugin from './plugins/express/static/index';
import notFoundMiddlewarePlugin from './plugins/express/404';

import partials from './partials';
import helpers from './lib/handlebars/helpers';

import routes from './routes';
import permissions from './permissions';

import showNotFoundPage from './lib/express/showNotFoundPage';

import mongoExpressConfig from './config.mongo.js';

// modules
import nodes from './modules/nodes/index.js';
import forum from './modules/forum/index.js';
import comments from './modules/comments/index.js';

export default {
    $plugins: [
        // wireDebugPlugin,
        expressAppPlugin,
        mongoExpressPlugin,
        expressRoutingMiddlewarePlugin,
        staticAssetsPlugin,
        notFoundMiddlewarePlugin,
    ],

    Application: {
        expressApplication: {
            database: 'isomorphic_dev',
            aclPrefix: 'acl_',
            permissions
        },
        mongoUIMiddleware: {
            route: '/admin/mongo',
            config: mongoExpressConfig
        },
        static: {
            dir: './public'
        },
        registerModules: {
            modules: [
                // nodes,
                forum,
                comments,
            ]
        },
        routeMiddleware: {
            routes: routes
        },
        notFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true,
            naughtSupport   : true
        }
    }
}