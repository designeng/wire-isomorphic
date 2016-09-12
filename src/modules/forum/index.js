import routes from './routes';
import Base from '../../lib/module/Base';
import Model from './entities/Forum';

class Forum extends Base {
    constructor() {
        super();
        this.routes = routes;
    }

    getRootToken() {
        return 'forums';
    }

    create(url, data, query, cb) {
        this.model = new Model(data);
        this.model.save((err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    read(url, data, query, cb) {
        Model.find(query, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    update(url, data, query, cb) {
        cb(null, [ { action: 'UPDATE FORUM' } ]);
    }

    delete(url, data, query, cb) {
        cb(null, [ { action: 'DELETE FORUM' } ]);
    }
}

export default Forum;