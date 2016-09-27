import wireDebugPlugin from 'essential-wire/source/debug';
import vidomComponentPlugin from '../../plugins/component/vidom';
import requestPlugin from '../../plugins/api/request';

import { getEndpoint, getLocalEndpoint } from '../../config/api';

import commentFormTpl from '../../templates/forms/commentFormTpl';
import commentsListTpl from '../../templates/commentsListTpl';
import summaryTpl from '../../templates/build/summaryTpl';

import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        // wireDebugPlugin,
        requestPlugin,
        vidomComponentPlugin
    ],

    commentsListData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/comments'),
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
        createComponent: {
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