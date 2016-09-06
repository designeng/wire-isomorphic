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
}

export default Forum;