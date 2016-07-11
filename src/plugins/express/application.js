import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Timer from '../../utils/timer';

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

// factories
function expressApplication(resolver, compDef, wire) {
    if (!compDef.options) {
        throw new Error("Please set true value to create Express application.")
    }
    const app = express();

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));

    app.use(cookieParser());

    resolver.resolve(app);
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
            }
        }
    }
}