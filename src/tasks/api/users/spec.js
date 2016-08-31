import User from '../../../models/User';
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