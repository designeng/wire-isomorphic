import _ from 'underscore';
import Handlebars from 'handlebars';

Handlebars.registerHelper('options', function(array, active, valueTpl) {
    let _valueTpl = Handlebars.compile(valueTpl);
    
    let result = _.map(array, (item) => {
        let selected = item.id == active ? 'selected' : '';
        return '<option value="' + _valueTpl(item) + '" ' + selected + '>' + item.name + '</option>';
    });
    
    return new Handlebars.SafeString(result.join(''));
});

Handlebars.registerHelper('inc', function(value) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// from https://github.com/badsyntax/handlebars-form-helpers/blob/master/src/handlebars.form-helpers.js
function openTag(type, closing, attr) {
    var html = ['<' + type];
    for (var prop in attr) {
      // A falsy value is used to remove the attribute.
      // EG: attr[false] to remove, attr['false'] to add
      if (attr[prop]) {
        html.push(prop + '="' + attr[prop] + '"');
      }
    }
    return html.join(' ') + (!closing ? ' /' : '') + '>';
}

const closeTag = (type) => {
    return `</${type}>`;
}

const createElement = (type, closing, attr, contents) => {
    return openTag(type, closing, attr) + (closing ? (contents || '') + closeTag(type) : '');
}

const helperSelect = (name, items, selected, options) => {
    options = options || {hash: {}};
    // If the selected value is an array, then convert the
    // select to a multiple select
    if (selected instanceof Array) {
        options.hash.multiple = 'multiple';
    }

    // Generate the list of options
    var optionsHtml = '';
    for (let i = 0, j = items.length; i < j; i++) {

        // <option> attributes
        let attr = {
            value: items[i].value
        };

        // We can specify which options are selected by using either:
        // * an array of selected values or
        // * a single selected value
        if (
            (selected instanceof Array && indexOf(selected, items[i].value) !== -1) ||
            (selected === items[i].value)
        ) {
            attr.selected = 'selected';
        }

        optionsHtml += createElement('option', true, attr, items[i].text);
    }

    return new Handlebars.SafeString(createElement('select', true, _.extend({
        id: name,
        name: name
    }, options.hash), optionsHtml));
}

Handlebars.registerHelper('select', helperSelect);