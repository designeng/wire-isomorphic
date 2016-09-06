import routes from './routes';
import Base from '../../lib/module/Base';

class Forum extends Base {
    constructor() {
        super();
        this.routes = routes;
    }

    getRootToken() {
        return 'forum';
    }

    create(data, query, cb) {
        cb(null, [ { action: 'CREATE FORUM' } ]);
    }

    read(data, query, cb) {
        cb(null, [ { action: 'READ FORUM' } ]);
    }

    update(data, query, cb) {
        cb(null, [ { action: 'UPDATE FORUM' } ]);
    }

    delete(data, query, cb) {
        cb(null, [ { action: 'DELETE FORUM' } ]);
    }
}

export default Forum;