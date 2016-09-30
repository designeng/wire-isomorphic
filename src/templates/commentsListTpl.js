import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { section, header, h1, form, input, label,
    ul, li, div, span, a, strong, button, footer } = hh(h);


export const renderCommentsList = (items) => {
    return ul('.comments-list', items.map((item) => {
        return li('.comments-list-item', [
            span('.comments-list-item-title', item.title),
            span('.comments-list-item-created', item.created)
        ])
    }))
}

export default renderCommentsList;