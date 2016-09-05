import User from '../../../entities/User';
import queryPlugin from '../../../plugins/mongo/query';

export default {
    $plugins: [
        queryPlugin
    ],

    response: {
        queryDB: {
            model: User
        }
    }
}