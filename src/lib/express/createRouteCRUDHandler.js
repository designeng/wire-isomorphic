import crud from 'node-crud';
import { getAcl } from '../acl';

const crudActions = ['create', 'read', 'update', 'delete'];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(url, baseUrl, module) {
    crudActions.forEach((action) => {
        let resourse = module.getRootToken();

        crud.entity(`/${resourse}${url}`)[capitalizeFirstLetter(action)]()
            .pipe((data, query, cb) => {
                // first check user permissions
                let acl = getAcl();

                // TODO: get user login from somewhere
                acl.isAllowed('joed', resourse, action, (err, res) => {
                    if (res) {
                        module[action](url, data, query, cb);
                    } else {
                        module.decline(url, resourse, action, cb);
                    }
                });

            });
    });
}