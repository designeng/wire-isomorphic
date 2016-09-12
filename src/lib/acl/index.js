import Acl from 'acl';
import mongoose from 'mongoose';

let acl;

export function getAcl(aclPrefix) {
    return acl ? acl : new Acl(new Acl.mongodbBackend(mongoose.connection.db, aclPrefix)); 
}