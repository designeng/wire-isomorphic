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
}

export default Comments;