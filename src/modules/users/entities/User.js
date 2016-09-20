import _ from 'underscore';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import when from 'when';
import { getAcl } from '../../../lib/acl';

let Promise = when.promise;

const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    access: { type: Date, default: Date.now },
    login: { type: Date, default: Date.now },
    status: Boolean,
    role: String,
});

// TODO: user.isModified method
UserSchema.pre('save', function(next, done) {
    let user = this;

    // store all user roles in special acl_users collection
    if(typeof user.role !== 'undefined') {
        let acl = getAcl();
        acl.addUserRoles(user.username, user.role);
    }

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.comparePasswordP = function(candidatePassword) {
    let user = this;
    return Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch)
            }
        });
    });
};

// Example: action: 'update', possible user permissions: 'update'(any), 'update_own', 'update_published'
// @return {Array} permissions
UserSchema.methods.getActionRelativePermissionsP = function(resource, action) {
    let acl = getAcl();
    let user = this;
    return Promise((resolve, reject) => {
        acl.allowedPermissions(user.username, resource, (err, result) => {
            if(err) {
                reject(err);
            } else {
                let actionGroup = _.filter(result[resource], (permission) => {
                    let match = permission.match(new RegExp(`^${action}(_)?`, 'g'));
                    return match;
                });
                resolve(actionGroup);
            }
        });
    });
}

UserSchema.methods.isAllowedP = function(resource, permissions) {
    let acl = getAcl();
    let user = this;
    return Promise((resolve, reject) => {
        acl.isAllowed(user.username, resource, permissions, (err, allowed) => {
            if(err) {
                reject(err);
            } else {
                resolve(allowed);
            }
        });
    });
}

let User = mongoose.model('User', UserSchema);

export default User;