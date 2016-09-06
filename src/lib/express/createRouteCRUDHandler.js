import crud from 'node-crud';

const crudActions = ['Create', 'Read', 'Update', 'Delete'];

let launched = false;

export default function createRouteCRUDHandler(target, url) {
    crudActions.forEach((action) => {
        crud.entity('/fakecomments')[action]()
            .pipe(function(data, query, cb) {
                cb(null, [ { name: 'bobby tables' } ]);
            });

        // crud.launch(target);
    });
}