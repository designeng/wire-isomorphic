import _ from 'underscore';

// Pages specs
import carcassSpec from './tasks/carcass/spec';
import mainPageSpec from './tasks/main/page.spec';

// API specs
import brandsSpec from './tasks/api/brands/spec';
import citiesSpec from './tasks/api/cities/spec';

import pluck from './utils/pluck';
import { success, error } from './contextCallbacks';

import * as types from './config/page/types';

const routes = [
    {
        url: '/',
        routeSpec: [carcassSpec],
        metaDescription: {
            type: types.MAIN,
            example: '/'
        }
    },
    {
        url: '/api/v1/brands',
        routeSpec: [brandsSpec],
        headers: {
            'Content-Type': 'application/json'
        }
    },
    {
        url: '/api/v1/cities',
        routeSpec: [citiesSpec],
        headers: {
            'Content-Type': 'application/json'
        }
    },
];

_.each(routes, (route) => {
    _.extend(route, {success, error});
});

export default routes;