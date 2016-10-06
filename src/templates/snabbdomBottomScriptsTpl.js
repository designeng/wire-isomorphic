import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';

const { script } = hh(h);

export const snabbdomBottomScriptsTpl = (data) => {
    let result = script('', {
        props: {
            type: 'text/javascript',
            async: true,
            src: data.src
        }
    })
    console.log(result);
    return result;
}

export default snabbdomBottomScriptsTpl;