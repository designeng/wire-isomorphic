import _ from 'underscore';

const specs = [
    {name: 'carcassSpec', path: '/tasks/carcass/spec'},
    {name: 'mainPageSpec', path: '/tasks/main/spec'},
    {name: 'clientSpecialSpec', path: '/tasks/client/special/spec'},
    {name: 'usersSpec', path: '/tasks/users/spec'},
    {name: 'forumThreadsSpec', path: '/tasks/forum/threads/spec'},
    {name: 'commentsSpec', path: '/tasks/comments/spec'},
    // API specifications
    {name: 'apiBrandsSpec', path: '/tasks/api/brands/spec'},
    {name: 'apiCitiesSpec', path: '/tasks/api/cities/spec'},
    {name: 'apiUsersSpec', path: '/tasks/api/users/spec'},
];

let dirPrefix = '.';

module.exports = _.reduce(specs, (result, spec) => {
    // all specs exported from own modules as default
    result[spec.name] = require(dirPrefix + spec.path).default;
    return result;
}, {});

module.exports._specSource = specs;