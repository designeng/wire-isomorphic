import _ from 'underscore';
import $ from 'jquery';

function getUIControls(resolver, compDef, wire) {
    let uiControls = compDef.options;

    $(document).ready(() => {
        resolver.resolve(_.reduce(uiControls, (result, value, key) => {
            result[key] = $(value);
            return result;
        }, {}));
    });
} 

export default function getUIControlsPlugin(options) {
    return {
        factories: {
            getUIControls
        }
    }
}
