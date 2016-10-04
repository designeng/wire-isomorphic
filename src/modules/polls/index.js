import routes from './routes';
import Base from '../../lib/module/Base';
import Model from './entities/Poll';

class Polls extends Base {

    constructor() {
        super();
        this.routes = routes;
        this.Model = Model;
    }

    getResourceName() {
        return 'polls';
    }
}

export default Polls;