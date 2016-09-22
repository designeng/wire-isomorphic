import wireDebugPlugin from 'essential-wire/source/debug';
import createComponentPlugin from '../../plugins/component';
import commentFormTpl from '../../templates/build/forms/commentFormTpl';

export default {
    $plugins: [
        createComponentPlugin
    ],

    commentForm: {
        createComponent: {
            template: commentFormTpl
        }
    },

    pageContent: {$ref: 'commentForm'}
}