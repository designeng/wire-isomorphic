import _ from 'underscore';
import { getAcl } from '../acl';
import inArray from '../inArray';

const crudActions = {
    'create': 'post',
    'read': 'get',
    'update': 'put',
    'delete': 'delete'
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function merge(a, b) {
    let k;
    a = a || {};
    b = b || {};
    for (k in b) a[k] = b[k];
    return a;
}

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(target, url, baseUrl, module) {
    let resourse = module.getRootToken();
    let acl = getAcl();

    _.each(_.keys(crudActions), (action) => {
        let method = crudActions[action];
        target[method](`${url}`, function(request, response, next) {

            const callback = (error, result) => {
                let obj = {
                    error,
                    data: result
                }
                response.json(obj);
            }

            let data = request.body;
            let query = merge(request.query || {}, request.params);
            let user = request.user;

            if(user) {
                let username = user.username;

                if(typeof user.role === 'undefined') {user.role = 'logged'}

                if(user.role) {
                    acl.whatResources(user.role, (err, resourses) => {
                        if(_.isEmpty(resourses)) {
                            // user is authorized, but has no roles
                        } else {
                            // user has permission
                            if(inArray(resourses[resourse], action)) {
                                module[action](url, data, query, callback);
                            } else {
                                // TODO: prevent decline for authorized users without roles! e.g. "admin" role can inherit 
                                module.decline(url, resourse, action, callback);
                            }
                        }
                    })
                }
            } else {
                response.json({user: 'anonimus'});
            }

            
        });
    });
}