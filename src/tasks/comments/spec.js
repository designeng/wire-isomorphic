import wireDebugPlugin from 'essential-wire/source/debug';
import snabbdomComponentPlugin from '../../plugins/component/snabbdom';
import commentFormTpl from '../../templates/build/forms/commentFormTpl';
import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        wireDebugPlugin,
        snabbdomComponentPlugin
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

    response: {$ref: 'commentForm'}
}