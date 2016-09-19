import routes from './routes';
import Base from '../../lib/module/Base';
import Model from './entities/Comment';

class Comments extends Base {

    constructor() {
        super();
        this.routes = routes;
        this.Model = Model;
    }

    getRootToken() {
        return 'comments';
    }
}

export default Comments;