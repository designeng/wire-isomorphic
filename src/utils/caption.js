export default function caption(item, options = {mode: 'link'}) {
    const regexp = /\{(.*?)\}/;

    if (item.caption.match(regexp)) {
        return item.caption.replace(regexp, (match, aText) => {
            if (options.mode === 'text') {
                return aText;
            } else if (options.mode === 'link') {
                return '<a href="' + item.url + '">' + aText + '</a>';
            }
        });
    } else {
        if (options.mode === 'text') {
            return item.caption;
        } else if (options.mode === 'link') {
            return '<a href="' + item.url + '">' + item.caption + '</a>';
        }
    }
}