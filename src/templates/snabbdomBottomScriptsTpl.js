import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { script } = hh(h);

export const snabbdomBottomScriptsTpl = (data) => {
    let result = script('.bottom-script', {
        props: {
            type: 'text/javascript',
            sync: data.items[0].sync,
            src: data.items[0].src
        }
    })
    console.log(result, data, data.src);
    return result;
}

export default snabbdomBottomScriptsTpl;