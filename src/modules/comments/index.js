import routes from './routes';
import Base from '../../lib/module/Base';

class Comments extends Base {
    constructor() {
        super();
        this.routes = routes;
    }

    getRootToken() {
        return 'comments';
    }

    registerEventListeners() {
        return {
            'create_comment': this.create,
            'read_comment': this.read,
            'update_comment': this.update,
            'delete_comment': this.delete,
        }
    }

    create(url, data, query, cb) {
        cb(null, [ { action: 'CREATE COMMENT' } ]);
    }

    read(url, data, query, cb) {
        cb(null, [ { action: 'READ COMMENT' } ]);
    }

    update(url, data, query, cb) {
        cb(null, [ { action: 'UPDATE COMMENT' } ]);
    }

    delete(url, data, query, cb) {
        cb(null, [ { action: 'DELETE COMMENT' } ]);
    }

}

export default Comments;