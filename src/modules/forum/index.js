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
        new Model(data).save((err, result) => {
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
        // TODO: for many?
        Model.findOneAndUpdate(query, data, null, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }

    delete(url, data, query, cb) {
        Model.remove(query, (err, result) => {
            if (err) return console.error(err);
            cb(null, result);
        });
    }
}

export default Forum;