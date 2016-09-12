import crud from 'node-crud';

const crudActions = ['Create', 'Read', 'Update', 'Delete'];

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(url, baseUrl, module) {
    crudActions.forEach((action) => {

        // TODO: check user permissions here before crud.entity invocation
        
        crud.entity(`/${module.getRootToken()}${url}`)[action]()
            .pipe(function(data, query, cb) {
                module[action.toLowerCase()](url, data, query, cb);
            });
    });
}