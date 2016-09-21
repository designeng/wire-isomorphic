import wireDebugPlugin from 'essential-wire/source/debug';
import expressAppPlugin from './plugins/express/application';
import cleanCookieMiddlewarePlugin from './plugins/express/cookie/clean';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import mongoExpressPlugin from './plugins/mongo';
import userPlugin from './plugins/entities/user';
import readFilePlugin from './plugins/file/read';

import staticAssetsPlugin from './plugins/express/static/index';
import notFoundMiddlewarePlugin from './plugins/express/404';

import partials from './partials';
import helpers from './lib/handlebars/helpers';

import routes from './routes';

import showNotFoundPage from './lib/express/showNotFoundPage';

import mongoExpressConfig from './config.mongo.js';

// modules
import Nodes from './modules/nodes/index.js';
import Forum from './modules/forum/index.js';
import Comments from './modules/comments/index.js';
import Users from './modules/users/index.js';

const database = 'isomorphic_dev';

export default {
    $plugins: [
        // wireDebugPlugin,
        readFilePlugin,
        expressAppPlugin,
        mongoExpressPlugin,
        expressRoutingMiddlewarePlugin,
        staticAssetsPlugin,
        notFoundMiddlewarePlugin,
        userPlugin,
    ],

    permissionsJSON: {
        readFile: {
            path: process.env.PERMISSIONS
        }
    },

    Application: {
        expressApplication: {
            database,
            permissionsJSON: {'$ref': 'permissionsJSON'},
            secret: 'SOME_SECRET_STRING'
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
                Forum,
                Comments,
                Users,
            ]
        },
        routeMiddleware: {
            routes: routes
        },
        // notFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true,
            naughtSupport   : true
        }
    },

    // anonimus user will be inserted bypass mongoose User model
    anonimusUser: {
        createGuestUser: {
            database
        }
    }
}