import _ from 'underscore';
import express from 'express';
import routes from './routes';
import useRoutes from '../../utils/express/useRoutes';

export default function Forum() {
    this.name = 'forum';
    this.router = express.Router();
    this.routes = routes;
}

Forum.prototype = {
    register() {
        useRoutes(this.router, routes);
        console.log('registered - ', this.name);
    }
}