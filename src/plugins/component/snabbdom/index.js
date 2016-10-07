import _ from 'underscore';
import snabbdom from 'snabbdom';
import toHTML from 'snabbdom-to-html';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        datasource
    }) => {
        if(env === 'server') {
            const html = toHTML(template(datasource));
            resolver.resolve(html);
        } else {
            /* client */
            resolver.resolve(template(datasource));
        }
    });
}

export default function SnabbdomComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}