import express from 'express';
import useRoutes from '../express/useRoutes';

class BaseModule {
    constructor() {
        this.router = express.Router();
    }

    // override
    getRootToken() {}

    register() {
        useRoutes({
            target: this.router,
            routes: this.routes,
            // this.baseUrl 
            baseUrl: `/api/v1/${this.getRootToken()}`,
            module: this
        });
    }

    // CRUD methods
    create(url, data, query, cb) {
        new this.Model(data).save((err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    read(url, data, query, cb) {
        this.Model.find(query, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    update(url, data, query, cb) {
        // TODO: for many?
        this.Model.findOneAndUpdate(query, data, null, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    delete(url, data, query, cb) {
        this.Model.remove(query, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    // Decline if user has no permissions
    decline(url, resourse, action, cb) {
        cb(null, {MESSAGE: `You have no permissions for ${action} ${resourse}`});
    }
}

export default BaseModule;