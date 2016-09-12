import crud from 'node-crud';
import { getAcl } from '../acl';

const crudActions = ['create', 'read', 'update', 'delete'];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: conflict with target.use(apiRootPath + module.getRootToken(), module.router) ?
export default function createRouteCRUDHandler(url, baseUrl, module) {
    crudActions.forEach((action) => {
        
        crud.entity(`/${module.getRootToken()}${url}`)[capitalizeFirstLetter(action)]()
            .pipe(function(data, query, cb) {
                // TODO: check user permissions
                let acl = getAcl();
                acl.isAllowed('joed', 'blogs', 'takeALook', function(err, res){
                    if (res) {
                        console.log("....User joed is allowed to view blogs")
                    } else {
                        console.log("....User joed is not allowed to view blogs")
                    }
                });

                module[action](url, data, query, cb);
            });
    });
}