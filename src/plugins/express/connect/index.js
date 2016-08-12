import mongoose from 'mongoose';

function connect () {
    let db = 'mongodb://localhost:27017/isomorphic_dev';
    let options = { server: { socketOptions: { keepAlive: 1 }}};
    return mongoose.connect(db, options).connection;
}

function connectToDatabase(resolver, facet, wire) {
    let target = facet.target;
    let connection = connect()
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', () => {
            return resolver.resolve(target);
        });
}

export default function connectToDatabasePlugin(options) {
    return {
        facets: {
            connectToDatabase: {
                'initialize:before': connectToDatabase
            }
        }
    }
}