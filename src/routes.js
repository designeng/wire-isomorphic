import _ from 'underscore';

import bootstrapSpec from './tasks/bootstrap/bootstrap.spec';
import mainPageSpec from './tasks/main/page.spec';

// API
import brandsSpec from './tasks/api/brands/spec';
import citiesSpec from './tasks/api/cities/spec';

import pluck from './utils/pluck';
import { success, error } from './contextCallbacks';

import * as types from './config/page/types';

const routes = [
    {
        url: '/',
        routeSpec: [bootstrapSpec, mainPageSpec],
        metaDescription: {
            type: types.MAIN,
            example: '/'
        }
    },
    {
        url: '/api/v1/brands',
        routeSpec: [brandsSpec],
    },
    {
        url: '/api/v1/cities',
        routeSpec: [citiesSpec],
    },
];

_.each(routes, (route) => {
    _.extend(route, {success, error});
});

export default routes;