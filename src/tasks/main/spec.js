import wireDebugPlugin from 'essential-wire/source/debug';
import requestPlugin from '../../plugins/api/request';
import createComponentPlugin from '../../plugins/component';

import { getEndpoint } from '../../config/api';

import pageContentTpl from '../../templates/build/pageContentTpl';

export default {
    $plugins: [
        requestPlugin,
        createComponentPlugin,
    ],

    pageContentData: {
        literal: {
            content: `Here's the page content!`
        }
    },

    pageContent: {
        createComponent: {
            template: pageContentTpl,
            datasource: {$ref: 'pageContentData'},
        }
    }
}