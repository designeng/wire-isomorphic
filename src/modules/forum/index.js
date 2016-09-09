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

    create(url, data, query, cb) {
        cb(null, [ { action: 'CREATE FORUM' } ]);
    }

    read(url, data, query, cb) {
        cb(null, [ { action: 'READ FORUM' } ]);
    }

    update(url, data, query, cb) {
        cb(null, [ { action: 'UPDATE FORUM' } ]);
    }

    delete(url, data, query, cb) {
        cb(null, [ { action: 'DELETE FORUM' } ]);
    }
}

export default Forum;