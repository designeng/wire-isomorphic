import wireDebugPlugin from 'essential-wire/source/debug';
import vidomComponentPlugin from '../../plugins/component/vidom';

import commentFormTpl from '../../templates/forms/commentFormTpl';
import commentsListTpl from '../../templates/commentsListTpl';
import summaryTpl from '../../templates/build/summaryTpl';

import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        // wireDebugPlugin,
        vidomComponentPlugin
    ],

    commentsListData: [{body: 'first comment'}, {body: 'second comment'}],

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

    // summary: {
    //     createComponent: {
    //         template: summaryTpl,
    //         tags: [
    //             {CommentsList: {$ref: 'commentsList'}},
    //             {CommentForm: {$ref: 'commentForm'}},
    //         ]
    //     }
    // },

    @client
    commentFormEvents: {
        
    },

    response: {$ref: 'commentsList'}
}