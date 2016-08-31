import wireDebugPlugin from 'essential-wire/source/debug';
import requestPlugin from '../../plugins/api/request';
import createComponentPlugin from '../../plugins/component';

import { getLocalEndpoint } from '../../config/api';

import usersListTpl from '../../templates/build/usersListTpl';

export default {
    $plugins: [
        requestPlugin,
        createComponentPlugin,
    ],

    usersData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/users'),
        }
    },

    usersList: {
        createComponent: {
            template: usersListTpl,
            datasource: {$ref: 'usersData'},
        }
    }
}