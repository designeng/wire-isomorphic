import wireDebugPlugin from 'essential-wire/source/debug';
import requestPlugin from '../../plugins/api/request';

import { getEndpoint } from '../../config/api';
import controller from './controller';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
    ],

    body: {
        create: {
            module: controller,
            args: [
                {$ref: 'carcass'},
            ]
        }
    }
}