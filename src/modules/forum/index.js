import express from 'express';
import routes from './routes';

export default function Forum() {
    this.name = 'forum';
    this.router = express.Router();
    this.routes = routes;
}

Forum.prototype = {
    register() {
        this.routes.forEach((route) => {
            
        })
        console.log('registered - ', this.name);
    }
}