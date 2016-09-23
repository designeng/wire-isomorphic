import snabbdom from 'snabbdom';
import modules from 'snabbdom-to-html/modules';

var init = require('snabbdom-to-html/init');

var toHTML = init([
    modules.class,
    modules.props,
    modules.attributes,
    modules.style
])

// import toHTML from 'snabbdom-to-html';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        datasource,
    }) => {

        if(env === 'server') {
            let html = toHTML(template);
            resolver.resolve(html);
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