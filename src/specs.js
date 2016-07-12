import _ from 'underscore';

const specs = [
    {name: 'carcassSpec', path: '/tasks/carcass/spec'},
    {name: 'mainPageSpec', path: '/tasks/main/spec'},
    {name: 'clientSpecialSpec', path: '/tasks/client/special/spec'},
    {name: 'brandsSpec', path: '/tasks/api/brands/spec'},
    {name: 'citiesSpec', path: '/tasks/api/cities/spec'},
];

module.exports = _.reduce(specs, (result, spec) => {
    result[spec.name] = require('.' + spec.path).default;
    return result;
}, {});

module.exports._specSource = specs;