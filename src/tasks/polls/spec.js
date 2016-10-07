import wireDebugPlugin from 'essential-wire/source/debug';
import snabbdomComponentPlugin from '../../plugins/component/snabbdom';
import composeComponentPlugin from '../../plugins/component/compose';
import requestPlugin from '../../plugins/api/request';

import { getLocalEndpoint } from '../../config/api';

import { renderPollQuestionForm, renderPollForm, renderPollsList, summary } from '../../templates/forms/poll';

import { client, server } from '../../decorators/environment';
import pollActions from './pollActions';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
        snabbdomComponentPlugin,
        composeComponentPlugin
    ],

    actions: {
        // all actions list
    },

    @server({otherwise: []})
    pollsListData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/polls'),
            what: 'data'
        }
    },

    pollsList: {
        createComponent: {
            template: renderPollsList,
            datasource: {$ref: 'pollsListData'}
        }
    },

    pollForm: {
        createComponent: {
            template: renderPollForm,
            actions: pollActions
        },
    },

    summary: {
        composeComponent: {
            template: summary,
            tags: [
                {PollsList: {$ref: 'pollsList'}},
                {PollForm: {$ref: 'pollForm'}},
            ]
        }
    },

    pageContent: {$ref: 'summary'}
}