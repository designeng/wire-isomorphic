import express from 'express';

// TODO: ?should it be replaced with class?

function registerModule(resolver, compDef, wire) {
    let routes = compDef.options.routes;

    // define module routes
    

    // define module permissions


    resolver.resolve(target);
}

export default function ExpressModulePlugin(options) {
    return {
        factories: {
            registerModule
        },
    }
}