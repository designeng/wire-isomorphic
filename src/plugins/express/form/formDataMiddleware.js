import _ from 'underscore';
import rimraf from 'rimraf';
import FormData from 'form-data';
import normalizeCookies from '../../../lib/express/headers/cookie/normalizeCookies';

function formDataMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;
    const originApiHost = facet.options.originApiHost;
    const tempDir = facet.options.tempDir;

    const noop = (err) => {}

    routes.forEach(route => {
        let appendParts = route.appendParts;
        let forwardCookies = route.forwardCookies;

        target.post(route.url, function (request, response) {
            let headers = {};

            if(forwardCookies) {
                _.extend(headers, {'Cookie': normalizeCookies(request.cookies)});
            }

            var form = new FormData();

            _.each(appendParts(request.files), (value, key) => {
                form.append(key, value);
            });

            form.submit(originApiHost + route.originUrl, function(err, res) {
                if(err) {
                    console.error(err);
                }

                res.setEncoding('utf8');
                res.on('data', (data) => {
                    response.end(data);
                    let tempFileDir = tempDir + '/' + request.files.file.uuid;
                    rimraf(tempFileDir, noop);
                });
                res.resume();
            });

        });
    });
    resolver.resolve(target);
}


export default function formDataMiddlewarePlugin(options) {
    return {
        facets: {
            formDataMiddleware: {
                'initialize:before': formDataMiddleware
            }
        }
    }
}