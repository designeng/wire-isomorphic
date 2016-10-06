import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { script } = hh(h);

export const snabbdomBottomScriptsTpl = (data) => {
    let result = script('.bottom-script', {
        props: {
            type: 'text/javascript',
            async: data.items[0].async,
            src: data.items[0].src
        }
    })
    return result;
}

export default snabbdomBottomScriptsTpl;