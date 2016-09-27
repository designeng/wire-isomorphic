import { Component } from 'vidom';
import { node, renderToString } from 'vidom';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        events,
        datasource,
    }) => {

        // TODO: find the way to work with tpl
        if(env === 'server') {
            const html = renderToString(template('1234567'));
            resolver.resolve(html);
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