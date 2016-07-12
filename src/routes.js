import _ from 'underscore';

import pluck from './utils/pluck';
import { success, error } from './contextCallbacks';

// routeSpec tasks names should match exported ./specs.js objects names
const routes = [
    {
        url: '/',
        routeSpec: ['mainPageSpec', 'carcassSpec'],
        // tasks for webpack compilation can include the server tasks (isomorphic mode!)
        // plus something client-special
        webpack: ['clientSpecialSpec', 'mainPageSpec', 'carcassSpec'],
        pageId: 'main-page',
    },
    {
        url: '/api/v1/brands',
        routeSpec: ['brandsSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
    {
        url: '/api/v1/cities',
        routeSpec: ['citiesSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
];

_.each(routes, (route) => {
    _.extend(route, {success, error});
});

export default routes;