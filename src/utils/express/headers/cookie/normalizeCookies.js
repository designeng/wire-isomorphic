import _ from 'underscore';
import { checkInvalidHeaderChar, checkIsHttpToken } from '../rules-latest';

export default function normalizeCookies(cookies) {
    if(_.isString(cookies)) {
        return cookies;
    } else if(_.isObject(cookies)){
        let validCookie = _.reduce(cookies, (result, value, key) => {
            if(checkIsHttpToken(value) && checkIsHttpToken(key)) {
                result[key] = value;
            }
            return result;
        }, {})

        return _.map(validCookie, (value, key) => {
            return key + '=' + value;
        }).join(';');
    }
}