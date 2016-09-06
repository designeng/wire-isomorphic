import _ from 'underscore';

export default function inArray(array, item) {
    return _.indexOf(array, item) != -1 ? true : false;
}