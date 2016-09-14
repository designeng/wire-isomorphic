import Acl from 'acl';
import mongoose from 'mongoose';

let acl;
const aclPrefix = 'acl_';

export function getAcl() {
    
    if(!acl) {
        acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db, aclPrefix)); 
    }

    return acl;
}