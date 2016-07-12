function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        partials,
        datasource,
    }) => {
        
    });
}

export default function createComponentPlugin(options) {
    return {
        factories: {
            createComponent
        }
    }
}