import _ from 'underscore';

export default function shouldBeSkipped(pathname, array) {
    return _.reduce(array, (result, item) => {
        if(_.isString(item)) {
            result = pathname === item ? result + 1 : result;
        } else if(_.isRegExp(item)) {
            result = pathname.match(item) ? result + 1 : result;
        }
        return result;
    }, 0);
}