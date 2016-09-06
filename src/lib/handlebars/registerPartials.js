import _ from 'underscore';
import Handlebars from 'handlebars';

export default function registerPartials(partials) {
    _.each(partials, (value, key) => {
        Handlebars.registerPartial(key, value);
    })
}