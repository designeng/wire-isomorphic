import _ from 'underscore';
import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { section, header, h1, form, input, label,
    ul, li, div, span, a, strong, button, footer } = hh(h);

export const summary = () => 
    `<PollsList />
     <PollForm />
    `;

export const renderPollsList = (items) => 
    ul('.polls-list', items.map((item) => {
        return li('.polls-list-item', [
            span('.polls-list-item-title', item.title),
            span('.polls-list-item-created', item.created),
            // TODO: author
        ])
    }))

export const renderPollForm = (data) => {
    return form('.poll-form', [
        input('.poll-form--title', { attrs: { placeholder: 'Poll title', autofocus: true } }),
        data ? renderNoop() : renderQuestionsList(),
    ])
}

const renderQuestionsList = () =>
    div('.poll-form--questions-list-wrapper', [
        ul('.poll-form--questions-list', [
            li('.poll-form--questions-list-item', [renderPollQuestionInput()]),
            li('.poll-form--questions-list-item', [renderPollQuestionInput()]),
        ]),
        button('.poll-form--questions-list-extend', 'Add new question')
    ]);

const renderNoop = () => {
    return span('', 'noop element');
}

const renderPollQuestionInput = () => 
    input('.poll-question--body', { attrs: { placeholder: 'Poll question body' } })