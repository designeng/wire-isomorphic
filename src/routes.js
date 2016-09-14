import _ from 'underscore';
import auth from './tasks/api/service/auth';

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

    // TODO: should be resolved via modules
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
    // service
    {
        url: '/api/v1/my',
        handler: auth,
        method: 'POST'
    },
    {
        url: '/acl/drop',
        tasks: ['dropAclCollectionsSpec'],
        headers: {
            'Content-Type': 'application/json'
        }
    },
];

export default routes;