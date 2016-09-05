import wireDebugPlugin from 'essential-wire/source/debug';
import expressAppPlugin from './plugins/express/application';
import cleanCookieMiddlewarePlugin from './plugins/express/cookie/clean';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import mongoExpressPlugin from './plugins/mongo';

import staticAssetsPlugin from './plugins/express/static/index';
import notFoundMiddlewarePlugin from './plugins/express/404';

import partials from './partials';
import helpers from './utils/handlebars/helpers';

import routes from './routes';
import specs from './specs';
import permissions from './permissions';

import nodesRoutes from './modules/nodes/routes.js';
import forumRoutes from './modules/forum/routes.js';
import commentsRoutes from './modules/comments/routes.js';

import showNotFoundPage from './utils/express/showNotFoundPage';

import mongoExpressConfig from './config.mongo.js';

export default {
    $plugins: [
        // wireDebugPlugin,
        expressAppPlugin,
        mongoExpressPlugin,
        expressRoutingMiddlewarePlugin,
        staticAssetsPlugin,
        notFoundMiddlewarePlugin,
    ],

    NodesModule: {
        registerModule: {
            routes: nodesRoutes
        }
    },

    ForumModule: {
        registerModule: {
            routes: forumRoutes
        }
    },

    CommentsModule: {
        registerModule: {
            routes: commentsRoutes
        }
    },

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
        registerModules: {
            modules: [
                {$ref: 'NodesModule'},
                {$ref: 'ForumModule'},
                {$ref: 'CommentsModule'},
            ]
        },
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