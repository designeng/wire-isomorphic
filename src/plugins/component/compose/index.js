import _ from 'underscore';

function composeComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        datasource = {}
    }) => {

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
    });
}

export default function ComposeComponentPlugin(options) {
    return {
        factories: {
            composeComponent
        }
    }
}