import wireDebugPlugin from 'essential-wire/source/debug';
import createComponentPlugin from '../../plugins/component';
import commentFormTpl from '../../templates/build/forms/commentFormTpl';
import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        createComponentPlugin
    ],

    commentForm: {
        createComponent: {
            template: commentFormTpl,
            events: {$ref: 'commentFormEvents'}
        }
    },

    @client
    commentFormEvents: {
        
    },

    pageContent: {$ref: 'commentForm'}
}