import _ from 'underscore';
import { node, renderToString } from 'vidom';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        events,
        datasource = {},
    }) => {



        if(tags) {
            if(!_.isArray(tags)) throw new Error('[createComponentPlugin:] tags option should be an array!');

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
                console.log('datasource::::', datasource, template);
                const html = renderToString(template(datasource));
                resolver.resolve(html);
            }
        }
    });
}

export default function VidomComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}