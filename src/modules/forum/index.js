export default function Forum() {
    this.name = 'forum';
    this.router = require('express').Router();
    this.routes = require('./routes');
}

Forum.prototype = {
    register() {
        this.routes.forEach((route) => {
            
        })
        console.log('registered - ', this.name);
    }
}