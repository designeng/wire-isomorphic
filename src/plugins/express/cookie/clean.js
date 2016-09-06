import _ from 'underscore';
import url from 'url';

import { checkInvalidHeaderChar, checkIsHttpToken } from '../../../lib/express/headers/rules-latest';

let cityRegex = /(.*,)([0-9]+)/;

function cleanCookie(resolver, facet, wire) {
    const target = facet.target;
    target.use((request, response, next) => {
        if(request.url.match(/^\/_\/clean\/cookie/)) {
            // Workaround: to prevent cookies 'city' like '[city-name], [city-id]'
            const { query } = url.parse(request.url, true);

            let cityCookieData = request.cookies['city'];

            let cleanCityCookieData = cityCookieData.replace(cityRegex, function(match, p1, p2) {
                return p2;
            });
            response.cookie('city' , cleanCityCookieData);
            return response.redirect(query.url);
        } else if(request.url.match(/^(\/css\/|\/js\/|\/images\/|\/assets\/|\/admin\/|\/_\/)/)) {
            next();
        } else {
            let cityCookieData = request.cookies['city'];
            if(!cityCookieData) {
                next();
            } else if(!cityCookieData.match(cityRegex)) {
                next();
            } else {
                response.redirect(`/_/clean/cookie?url=${request.url}`);
            }
        }
    });

    resolver.resolve(target);
}

export default function cleanCookieMiddlewarePlugin(options) {
    return {
        facets: {
            cleanCookie: {
                'initialize:before': cleanCookie
            }
        }
    }
}