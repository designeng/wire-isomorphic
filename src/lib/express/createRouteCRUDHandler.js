// import crud from 'node-crud';
import _ from 'underscore';
import { getAcl } from '../acl';

const crudActions = {
    'create': 'post',
    'read': 'get',
    'update': 'put',
    'delete': 'delete'
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(target, url, baseUrl, module) {
    // let resourse = module.getRootToken();

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
            let query = request.query;

            module[action](url, data, query, callback);
        });
    });

    // crudActions.forEach((action) => {
    //     let resourse = module.getRootToken();

    //     crud.entity(`/${resourse}${url}`)[capitalizeFirstLetter(action)]()
    //         .pipe((data, query, cb) => {
    //             // first check user permissions
    //             let acl = getAcl();

    //             // TODO: jwt token?
    //             // TODO: get user login from somewhere
    //             acl.isAllowed('joed', resourse, action, (err, res) => {
    //                 if (res) {
    //                     console.log('ALLOWED', res);
    //                     module[action](url, data, query, cb);
    //                 } else {
    //                     module.decline(url, resourse, action, cb);
    //                 }
    //             });

    //         });
    // });
}