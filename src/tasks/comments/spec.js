import wireDebugPlugin from 'essential-wire/source/debug';
import snabbdomComponentPlugin from '../../plugins/component/snabbdom';
import composeComponentPlugin from '../../plugins/component/compose';
import requestPlugin from '../../plugins/api/request';

import { getEndpoint, getLocalEndpoint } from '../../config/api';

import commentFormTpl from '../../templates/forms/commentFormTpl';
import commentsListTpl from '../../templates/commentsListTpl';
import summaryTpl from '../../templates/summaryTpl';

import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
        snabbdomComponentPlugin,
        composeComponentPlugin
    ],

    commentsListData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/comments'),
            what: 'data'
        }
    },

    commentsList: {
        createComponent: {
            template: commentsListTpl,
            datasource: {$ref: 'commentsListData'}
        }
    },

    commentForm: {
        createComponent: {
            template: commentFormTpl,
            events: {$ref: 'commentFormEvents'}
        }
    },

    summary: {
        composeComponent: {
            template: summaryTpl,
            tags: [
                {CommentsList: {$ref: 'commentsList'}},
                {CommentForm: {$ref: 'commentForm'}},
            ]
        }
    },

    @client
    commentFormEvents: {
        
    },

    response: {$ref: 'summary'}
}