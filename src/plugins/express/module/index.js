import express from 'express';

function registerModule(resolver, compDef, wire) {
    let routes = compDef.options.routes;
}

export default function ExpressModulePlugin(options) {
    return {
        factories: {
            registerModule
        },
    }
}