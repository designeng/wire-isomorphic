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
        console.log('DATA', data, query);
        this.model = new Model();
        this.model.save((err, result) => {
            if (err) return console.error(err);
            cb(null, [ { action: `FORUM CREATED: ${JSON.stringify(result)}` } ]);
        });
    }

    read(url, data, query, cb) {
        Model.find({}, (err, result) => {
            if (err) return console.error(err);
            cb(null, [ { action: `FORUM READ: ${JSON.stringify(result)}` } ]);
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