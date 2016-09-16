import _ from 'underscore';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { getAcl } from '../../lib/acl';
import jwtVerify from '../../lib/express/middlewares/jwtVerify';
import User from '../../modules/users/entities/User';

import Timer from '../../lib/timer';

// facets
function startExpressServerFacet(resolver, facet, wire) {
    const port = facet.options.port;
    let target = facet.target;
    const { verbose, naughtSupport } = facet.options;
    const server = target.listen(port, () => {
        if (verbose === true) {
            const host = server.address().address;
            const port = server.address().port;
            console.info(`==> 🌎  Express app listening at http://%s:%s (${new Timer().getFormattedTime()})`, host, port);
        }

        if (naughtSupport === true) {
            if (process.send) process.send('online');
            process.on('message', (message) => {
                if (message === 'shutdown') process.exit(0);
            });
        }
    });
    resolver.resolve(target);
}

// TODO: move to expressStaticMiddlewarePlugin ?
function staticFacet(resolver, facet, wire) {
    const dir = facet.options.dir;
    let target = facet.target;
    target.use(express.static(dir));
    resolver.resolve(target);
}

function faviconFacet(resolver, facet, wire) {
    let target = facet.target;
    let path = facet.options.path
    target.use(favicon(path));
    resolver.resolve(target);
}

function registerModulesFacet(resolver, facet, wire) {
    let target = facet.target;
    const modules = facet.options.modules;

    const apiRootPath = '/api/v1/';

    _.each(modules, (Module) => {
        let module = new Module({
            baseUrl: apiRootPath
        });
        module.register();
        target.use(apiRootPath + module.getRootToken(), jwtVerify(target, User), module.router);
    });

    resolver.resolve(target);
}

// factories
function expressApplication(resolver, compDef, wire) {
    if (!compDef.options) {
        throw new Error("Please set true value to create Express application.")
    }
    const app = express();
    app.use(cookieParser());

    wire(compDef.options).then((options) => {
        let database = options.database;
        let aclPrefix = options.aclPrefix || undefined;
        let permissionsJSON = options.permissionsJSON;
        let parsedPermissions;

        if(_.isString(permissionsJSON)) {
            try {
                parsedPermissions = JSON.parse(permissionsJSON)
            } catch (err) {
                throw new Error('Permissions parsing error!');
            }
        }

        let secret = compDef.options.secret;

        const connect = () => {
            let db = `mongodb://localhost:27017/${database}`;
            let options = { server: { socketOptions: { keepAlive: 1 }}};
            return mongoose.connect(db, options).connection;
        }

        let connection = connect()
            .on('error', console.log)
            .on('disconnected', connect)
            .once('open', () => {
                let acl = getAcl();
                acl.allow(parsedPermissions.permissions);

                acl.addUserRoles('admin', 'moderator');

                acl.whatResources('moderator', function(err, resourses){
                    console.log('moderator resourses: ', resourses)
                });
            });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.set('jwtTokenSecret', secret);
        
        return resolver.resolve(app);
    })
}

export default function ExpressAppPlugin(options) {
    return {
        factories: {
            expressApplication
        },
        facets: {
            favicon: {
                initialize: faviconFacet
            },
            static: {
                'initialize:before': staticFacet
            },
            server: {
                ready: startExpressServerFacet
            },
            registerModules: {
                'initialize:before': registerModulesFacet
            },
        }
    }
}