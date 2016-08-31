import mongoose from 'mongoose';

function queryDB(resolver, compDef, wire) {
    let model = compDef.options.model;

    resolver.resolve();
}

export default function queryPlugin(options) {
    return {
        factories: {
            queryDB
        }
    }
}