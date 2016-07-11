import $ from "jquery";

function bindEventsFacet(resolver, compDef, wire) {
    wire(compDef.options).then(({
        list
    }) => {
        let events = list.forEach(item => {
            let selector = item.class ? '.' + item.class : (item.id ? '#' + item.id : 'none')
            $(selector).on(item.event, item.handler);
        });

        resolver.resolve(events)
    })
}

export default function bindEventsPlugin(options) {
    return {
        facets: {
            bindEvents: {
                'ready': bindEventsFacet
            }
        }
    }
}