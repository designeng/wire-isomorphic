import _ from 'underscore';

let registeredUrlPlugins = {};

export default function registerRoutePlugins(route, specs) {
    let id = route._id;

    registeredUrlPlugins[id] || (registeredUrlPlugins[id] = {
        plugins: [],
        names: {}
    });

    _.each(route.tasks, (spec) => {
        _.each(specs[spec].$plugins, (plugin) => {
            registeredUrlPlugins[id].names[plugin.name] || (registeredUrlPlugins[id].names[plugin.name] = 1 && registeredUrlPlugins[id].plugins.push(plugin));
        });
    });
}

export function createSuffixSpecifications(route) {
    console.log('route._id:::::', route._id);
    return [{$plugins: registeredUrlPlugins[route._id].plugins}];
}