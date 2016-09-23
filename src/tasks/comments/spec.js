import wireDebugPlugin from 'essential-wire/source/debug';
import vidomComponentPlugin from '../../plugins/component/vidom';
import commentFormTpl from '../../templates/build/forms/commentFormTpl';
import { client, server } from '../../decorators/environment';

export default {
    $plugins: [
        vidomComponentPlugin
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