import _ from 'underscore';
import { success, error } from './contextCallbacks';

// tasks names should match exported ./specs.js objects names
const routes = [
    {
        url: '/',
        tasks: ['mainPageSpec', 'carcassSpec'],
        // tasks for webpack compilation can include the server tasks (isomorphic mode!)
        // plus something client-special
        webpack: ['clientSpecialSpec', 'mainPageSpec', 'carcassSpec'],
        routeId: 'main-page',
    },
    {
        url: '/users',
        tasks: ['usersSpec', 'carcassSpec'],
    },
    {
        url: '/api/v1/brands',
        tasks: ['apiBrandsSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
    {
        url: '/api/v1/cities',
        tasks: ['apiCitiesSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
    {
        url: '/api/v1/users',
        tasks: ['apiUsersSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
];

_.each(routes, (route) => {
    _.extend(route, {success, error});
});

export default routes;