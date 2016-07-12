function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        partials,
        datasource,
    }) => {
        // TODO: use partials
        
        resolver.resolve(template(datasource));
    });
}

export default function createComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}