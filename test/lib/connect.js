import mongoose from 'mongoose';

export function connect() {
    let db = `mongodb://localhost:27017/isomorphic_dev`;
    let options = { server: { socketOptions: { keepAlive: 1 }}};
    return mongoose.connect(db, options).connection;
}

export function establishConnection(done) {
    connect()
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', () => {
            done();
        });
}

export function closeConnection() {
    mongoose.connection.close();
}