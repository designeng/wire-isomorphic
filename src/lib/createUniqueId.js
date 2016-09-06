import _ from 'underscore';

export default function createUniqueId(obj, prefix) {
    _.extend(obj, {_id: _.uniqueId(prefix)});
}