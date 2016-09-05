import _ from 'underscore';
import express from 'express';
import routes from './routes';
import createUniqueRouteId from '../../utils/createUniqueId';

export default function Forum() {
    this.name = 'forum';
    this.router = express.Router();
    this.routes = routes;

    createUniqueRouteId(this.routes);
}

Forum.prototype = {
    register() {
        this.routes.forEach((route) => {
            
        })
        console.log('registered - ', this.name);
    }
}