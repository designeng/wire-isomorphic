import _ from 'underscore';
import auth from './tasks/api/service/auth';
import compare from './tasks/compare';

// tasks names should match exported ./specs.js objects names
const routes = [
    {
        url: '/',
        tasks: ['mainPageSpec', 'carcassSpec'],
        // tasks for webpack compilation can include the server tasks (isomorphic mode!)
        // plus something client-special
        // webpack: ['clientSpecialSpec', 'mainPageSpec', 'carcassSpec'],
        webpack: ['clientSpecialSpec', 'mainPageSpec'],
        format: 'html'
    },
    {
        url: '/users',
        tasks: ['usersSpec', 'carcassSpec']
    },

    // experiments with snabbdom
    {
        url: '/comments/form',
        tasks: ['commentsSpec']
    },

    // page with poll interface
    {
        url: '/polls',
        tasks: ['pollsSpec', 'snabbdomCarcassSpec'],
        webpack: ['pollsSpec'],
        format: 'html'
    },
    {
        url: '/polls/:id',
        tasks: ['pollsSpec'],
        format: 'html'
    },

    {
        url: '/compare',
        handler: compare,
        format: 'html'
    },

    // TODO: should be resolved via modules
    {
        url: '/api/v1/brands',
        tasks: ['apiBrandsSpec'],
        format: 'json'
    },
    {
        url: '/api/v1/cities',
        tasks: ['apiCitiesSpec'],
        format: 'json'
    },
    // services
    // authentication server imitation, for https requests. Getting a Token
    {
        url: '/api/v1/auth',
        handler: auth,
        method: 'POST',
        format: 'json'
    },
    {
        url: '/acl/drop',
        tasks: ['dropAclCollectionsSpec'],
        format: 'json'
    },
];

export default routes;