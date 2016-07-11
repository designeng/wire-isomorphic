import _ from 'underscore';

function neglectChecker(url) {
    return function(result, part) {
        return result || url.match(part);
    }
}

function neglect(resolver, facet, wire) {
    const target = facet.target;
    const matches = facet.options.matches;
    target.use((request, response, next) => {
        if(_.reduce(matches, neglectChecker(request.url), false)){
            response.redirect('/');
        };
        return next();
    });

    resolver.resolve(target);
}

export default function neglectMiddlewarePlugin(options) {
    return {
        facets: {
            neglect: {
                'initialize:before': neglect
            }
        }
    }
}