import _ from 'underscore';
import * as widgets from '../../lib/widgets';

const advertisementPlaceholderRegex = /<!--@.*\s(widget_[a-zA-Z0-9]+)\s.*@-->/g;

function createWidgetsHash(resolver, compDef, wire) {
    wire(compDef.options).then(({
        html,
        params,
    }) => {
        let match;
        let hash = {};
        while(match = advertisementPlaceholderRegex.exec(html)) {
            let widgetName = match[1];
            hash[widgetName] = widgets[widgetName](params[widgetName]);
        }
        resolver.resolve(hash);
    });
}

export default function widgetsPlugin(options) {
    return {
        factories: {
            createWidgetsHash
        }
    }
}