import _ from 'underscore';

// common case
const tagRegex = /<([A-Z][a-zA-Z]+)(\s+)?(.*)\/>/g;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        datasource,
    }) => {
        let html = template(datasource);

        if(tags && !_.isArray(tags)) {
            throw new Error('[createComponentPlugin:] tags option should be an array!');
        }

        if(tags && tags.length) {
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
    });
}

export default function createComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}