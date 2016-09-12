import routes from './routes';
import Base from '../../lib/module/Base';
import Model from './entities/Forum';

class Forum extends Base {

    constructor() {
        super();
        this.routes = routes;
        this.Model = Model;
    }

    getRootToken() {
        return 'forums';
    }
}

export default Forum;