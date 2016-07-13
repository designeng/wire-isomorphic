import _ from 'underscore';
import { success, error } from './contextCallbacks';

// routeSpec tasks names should match exported ./specs.js objects names
const routes = [
    {
        url: '/',
        routeSpec: ['mainPageSpec', 'carcassSpec'],
        // tasks for webpack compilation can include the server tasks (isomorphic mode!)
        // plus something client-special
        webpack: ['clientSpecialSpec', 'mainPageSpec', 'carcassSpec'],
        routeId: 'main-page',
    },
    {
        url: '/api/v1/brands',
        routeSpec: ['apiBrandsSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
    {
        url: '/api/v1/cities',
        routeSpec: ['apiCitiesSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
];

_.each(routes, (route) => {
    _.extend(route, {success, error});
});

export default routes;