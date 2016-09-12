import routes from './routes';
import Base from '../../lib/module/Base';
import Model from './entities/User';

class Users extends Base {

    constructor() {
        super();
        this.routes = routes;
        this.Model = Model;
    }

    getRootToken() {
        return 'users';
    }
}

export default Users;