import _ from 'underscore';
import meld from 'meld';
import pipeline from 'when/pipeline';
import express from 'express';
import useRoutesStrategies from '../express/useRoutesStrategies';

const crudActions = ['create', 'read', 'update', 'delete'];

const SUCCESS_STATUS = 200;
const UNAUTHORIZED_STATUS = 401;

const nullRestriction = (options) => {
    return options;
}

const ownRestriction = (options) => {
    let query = options.query;
    let user = options.user;
    return _.extend(query, {uid: user._id})
}

const publishedRestriction = (options) => {
    let query = options.query;
    return _.extend(query, {published: true})
}

function setupCrudActionsAccess(target) {
    let resource = target.getResourceName();
    let targetRestrictions = target.getRestrictions();

    _.each(crudActions, function(action) {
        meld.around(target, action, function(joinpoint) {

            let url = joinpoint.args[0].url;
            let user = joinpoint.args[0].user;
            let callback = joinpoint.args[0].callback;

            user.getActionRelativePermissionsP(resource, action).then((permissions) => {
                if(!permissions.length) {
                    // user has no permissions for current action
                    // TODO: prevent decline for authorized users without roles
                    return target.decline({ url, resource, action, user, callback });
                } else {
                    let actionRestrictions = _.map(permissions, (key) => {
                        return targetRestrictions[key];
                    });
                    pipeline(actionRestrictions).then((options) => {
                        joinpoint.proceedApply(options);
                    })
                }
            })
        });
    }, target);
}

class BaseModule {

    constructor() {
        this.router = express.Router();
        setupCrudActionsAccess(this);
    }

    // override
    getResourceName() {}

    // permissions & restrictions - two sides of the same coin
    getRestrictions() {
        return {
            'create': nullRestriction,
            'read': nullRestriction,
            'update': nullRestriction,
            'delete': nullRestriction,
            'read_own': ownRestriction,
            'update_own': ownRestriction,
            'delete_own': ownRestriction,
            'read_published': publishedRestriction,
            'update_published': publishedRestriction,
            'delete_published': publishedRestriction,
        }
    }

    register() {
        useRoutesStrategies({
            target: this.router,
            routes: this.routes,
            // this.baseUrl 
            baseUrl: `/api/v1/${this.getResourceName()}`,
            module: this
        });
    }

    // CRUD methods
    create({url, data, query, user, callback}) {
        data.uid = user._id;
        new this.Model(data).save((err, result) => {
            if (err) return console.error(err);
            callback(null, result, SUCCESS_STATUS);
        });
    }

    read({url, data, query, user, callback}) {
        this.Model.find(query, (err, result) => {
            if (err) return console.error(err);
            callback(null, result, SUCCESS_STATUS);
        });
    }

    // findOneAndUpdate callback returns updated document (options {new: true})
    update({url, data, query, user, callback}) {
        // TODO: for many?
        this.Model.findOneAndUpdate(query, data, {new: true}, (err, result) => {
            if (err) return console.error(err);
            // TODO: return only id? or whole updated object?
            callback(null, result, SUCCESS_STATUS);
        });
    }

    delete({url, data, query, user, callback}) {
        this.Model.remove(query, (err, result) => {
            if (err) return console.error(err);
            callback(null, result, SUCCESS_STATUS);
        });
    }

    // Decline if user has no permissions
    // TODO: get resource name from module itself!
    decline({url, resource, action, user, callback}) {
        callback(null, {message: `You have no permissions to ${action} ${resource}`}, UNAUTHORIZED_STATUS);
    }
}

export default BaseModule;