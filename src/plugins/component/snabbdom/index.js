import _ from 'underscore';
import snabbdom from 'snabbdom';
import modules from 'snabbdom-to-html/modules';

// var init = require('snabbdom-to-html/init');

// var toHTML = init([
//     modules.class,
//     modules.props,
//     modules.attributes,
//     modules.style
// ])

import toHTML from 'snabbdom-to-html';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        datasource = {}
    }) => {

        if(tags) {
            if(!_.isArray(tags)) throw new TypeError('[createComponentPlugin:] tags option should be an array!');

            let html = template(datasource);

            if(tags.length) {
                let tagsList = _.map(tags, (item) => {
                    let name = _.keys(item)[0];
                    return {
                        name,
                        html: item[name]
                    }
                });

                _.each(tagsList, (tag) => {
                    let tagRegex = new RegExp(`<${tag.name}(\\s+)\/>`, 'g');
                    html = html.replace(tagRegex, tag.html);
                });
            }
            resolver.resolve(html);

        } else {
            if(env === 'server') {
                const html = toHTML(template(datasource));
                resolver.resolve(html);
            }
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