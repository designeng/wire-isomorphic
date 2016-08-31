import mongoose from 'mongoose';

function queryDB(resolver, compDef, wire) {
    let model = compDef.options.model;
    const callback = (err, result) => {
        if (err) {
            resolver.reject(err);
        } else {
            resolver.resolve(JSON.stringify({items: result}));
        }
    }
    model.find({}).exec(callback);
}

export default function queryPlugin(options) {
    return {
        factories: {
            queryDB
        }
    }
}