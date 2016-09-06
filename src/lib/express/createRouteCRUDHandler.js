import crud from 'node-crud';

const crudActions = ['Create', 'Read', 'Update', 'Delete'];

export default function createRouteCRUDHandler(target, url) {
    crudActions.forEach((action) => {
        crud.entity('/fakecomments')[action]()
            .pipe(function(data, query, cb) {
                cb(null, [ { action: action } ]);
            });
    });
}