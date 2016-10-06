import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { script } = hh(h);

export const snabbdomBottomScriptsTpl = (data) => {
    return script('', {
        attrs: {
            type: 'text/javascript',
            async: true,
            src: data.src
        }
    })
}

export default snabbdomBottomScriptsTpl;