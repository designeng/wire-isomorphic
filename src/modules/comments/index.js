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

    registerEventListeners() {
        return {
            'create_comment': this.createComment,
            'read_comment': this.readComment,
            'update_comment': this.updateComment,
            'delete_comment': this.deleteComment,
        }
    }

    // should be implemented in Base module class!
    createComment(userId, parentId, title, message) {

    }

    readComment(commentId) {

    }

    updateComment(commentId) {

    }

    deleteComment(commentId) {

    }

}

export default Comments;