import express from 'express';
import useRoutes from '../express/useRoutes';

class BaseModule {
    constructor() {
        this.router = express.Router();
    }

    // override
    getRootToken() {}

    register() {
        useRoutes(this.router, this.routes);
    }

    // CRUD methods
    create(data) {

    }

    read(id) {

    }

    update(id, data) {

    }

    delete(id) {

    }
}

export default BaseModule;

// crud.entity('/users').Create()
//     .pipe(function(data, query, cb) {
//         console.log('create user', data, query);
//         cb(null, { data: data });
//     });