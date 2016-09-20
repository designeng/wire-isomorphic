import _ from 'underscore';
import meld from 'meld';
import express from 'express';
import useRoutesStrategies from '../express/useRoutesStrategies';

function createCrudAspects(target) {
    let permissions = target.getAdditionalPermissions();
    let permissionKeys = _.keys(permissions);

    _.each(['read', 'update', 'delete'], function(action) {
        meld.around(target, action, function(joinpoint) {
            let query = joinpoint.args[0].query;
            let user = joinpoint.args[0].user;
            let uid = user._id;

            // let actionGroup = _.filter(permissionKeys, (key) => {
            //     let match = action.match(new RegExp(`^${key}_`));
            //     return match;
            // });

            // console.log('actionGroup:', actionGroup);
            
            joinpoint.proceedApply(joinpoint.args);
        })
    }, target);
}

class BaseModule {
    constructor() {
        this.router = express.Router();
        createCrudAspects(this);
    }

    // override
    getRootToken() {}

    getAdditionalPermissions() {
        return {
            'read_own': (query, user) => {return _.extend(query, {uid: user._id})},
            'update_own': (query, user) => {return _.extend(query, {uid: user._id})},
            'delete_own': (query, user) => {return _.extend(query, {uid: user._id})},
            'read_published': (query, user) => {return _.extend(query, {published: true})},
            'update_published': (query, user) => {return _.extend(query, {published: true})},
            'delete_published': (query, user) => {return _.extend(query, {published: true})},
        }
    }

    register() {
        useRoutesStrategies({
            target: this.router,
            routes: this.routes,
            // this.baseUrl 
            baseUrl: `/api/v1/${this.getRootToken()}`,
            module: this
        });
        this.additionalPermissions = this.getAdditionalPermissions();
    }

    // CRUD methods
    create({url, data, query, user, callback}) {
        data.uid = user._id;
        new this.Model(data).save((err, result) => {
            if (err) return console.error(err);
            callback(null, result);
        });
    }

    read({url, data, query, user, callback}) {
        this.Model.find(query, (err, result) => {
            if (err) return console.error(err);
            callback(null, result);
        });
    }

    // findOneAndUpdate callback returns updated document (options {new: true})
    update({url, data, query, user, callback}) {
        console.log('UPDATE QUERY', query);
        // TODO: for many?
        this.Model.findOneAndUpdate(query, data, {new: true}, (err, result) => {
            if (err) return console.error(err);
            // TODO: return only id? or whole updated object?
            callback(null, result);
        });
    }

    delete({url, data, query, user, callback}) {
        this.Model.remove(query, (err, result) => {
            if (err) return console.error(err);
            callback(null, result);
        });
    }

    // Decline if user has no permissions
    // TODO: get resource name from module itself!
    decline({url, resource, action, user, callback}) {
        callback(null, {MESSAGE: `You have no permissions for ${action} ${resource}`});
    }
}

export default BaseModule;