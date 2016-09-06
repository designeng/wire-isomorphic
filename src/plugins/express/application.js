import _ from 'underscore';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Acl from 'acl';

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

        if(naughtSupport === true) {
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
        let module = new Module();
        module.register();
        target.use(apiRootPath + module.rootToken, module.router);
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

    let database = compDef.options.database;
    let aclPrefix = compDef.options.aclPrefix || undefined;
    let permissions = compDef.options.permissions;

    const connect = () => {
        let db = `mongodb://localhost:27017/${database}`;
        let options = { server: { socketOptions: { keepAlive: 1 }}};
        return mongoose.connect(db, options).connection;
    }

    let connection = connect()
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', () => {
            var acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db, aclPrefix));
            acl.allow(permissions);

            acl.allowedPermissions('joed', ['blogs', 'forums'], function(err, permissions){
                console.log('joed permissions: ', permissions)
            });
            
            acl.addUserRoles('joed', ['member']);

            acl.isAllowed('joed', 'blogs', 'takeALook', function(err, res){
                if(res){
                    console.log("User joed is allowed to view blogs")
                } else {
                    console.log("User joed is not allowed to view blogs")
                }
            });

            // acl.whatResources('member', function(err, resourses){
            //     console.log('member resourses: ', resourses)
            // });
        });

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    
    return resolver.resolve(app);
    
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