let registeredUrlPlugins = {};

function registerRoutePlugins(url, routeSpecs, specs) {
    registeredUrlPlugins[url] || (registeredUrlPlugins[url] = {
        plugins: [],
        names: {}
    });

    _.each(routeSpecs, (spec) => {
        _.each(specs[spec].$plugins, (plugin) => {
            registeredUrlPlugins[url].names[plugin.name] || (registeredUrlPlugins[url].names[plugin.name] = 1 && registeredUrlPlugins[url].plugins.push(plugin));
        });
    });
}

function createSuffixSpecifications(url) {
    return [{$plugins: registeredUrlPlugins[url].plugins}];
}