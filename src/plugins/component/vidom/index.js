import { Component } from 'vidom';
import { node, renderToString } from 'vidom';

let env = process.env.ENVIRONMENT;

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        tags,
        datasource,
    }) => {
        class Main extends Component {
            onRender() {
                return template
            }
        }

        // TODO: find the way to work with tpl
        if(env === 'server') {
            let html = template;
            // const html = renderToString(template);
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