import _ from 'underscore';

// common case
const tagRegex = /<([A-Z][a-zA-Z]+)(\s+)?(.*)\/>/g;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        partials,
        datasource,
    }) => {
        let html = template(datasource);

        if(partials && !_.isArray(partials)) {
            throw new Error('[createComponentPlugin:] partials option should be an array!');
        }

        if(partials && partials.length) {
            let tags = _.map(partials, (item) => {
                let name = _.keys(item)[0];
                return {
                    name,
                    html: item[name]
                }
            });

            _.each(tags, (tag) => {
                let tagRegex = new RegExp(`<${tag.name}(\\s+)\/>`, 'g');
                html = html.replace(tagRegex, tag.html);
            }, tags);
        }

        resolver.resolve(html);
    });
}

export default function createComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}