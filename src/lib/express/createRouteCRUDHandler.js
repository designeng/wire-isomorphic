import crud from 'node-crud';

const crudActions = ['create', 'read', 'update', 'delete'];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(url, baseUrl, module) {
    crudActions.forEach((action) => {

        // TODO: check user permissions here before crud.entity invocation
        
        crud.entity(`/${module.getRootToken()}${url}`)[capitalizeFirstLetter(action)]()
            .pipe(function(data, query, cb) {
                module[action](url, data, query, cb);
            });
    });
}