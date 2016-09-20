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
    let resource = module.getRootToken();
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

                if(user.role) {
                    // TODO: user is authorized, but has no roles ??
                    user.isAllowedP(resource, action).then((allowed) => {
                        if(allowed) {
                            module[action]({ url, data, query, user, callback });
                        } else {
                            // TODO: prevent decline for authorized users without roles! e.g. "admin" role can inherit (???????)
                            module.decline({ url, resource, action, user, callback });
                        }
                    }).catch((err) => {throw err});
                }
            } else {
                response.json({user: 'anonimus'});
            }

            
        });
    });
}