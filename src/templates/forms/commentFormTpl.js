import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { section, header, h1, form, input, label,
    ul, li, div, span, a, strong, button, footer } = hh(h);


export const renderCommentForm = () =>
    form('.comment-form', [
        input('.title', { attrs: { placeholder: 'Comment title', autofocus: true } }),
        input('.body', { attrs: { placeholder: 'Comment body', autofocus: true } }),
    ])

export default renderCommentForm;