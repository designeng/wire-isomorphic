import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
    name:    String,
    pass:  String,
    created: { type: Date, default: Date.now },
    access: { type: Date, default: Date.now },
    login: { type: Date, default: Date.now },
    status: Boolean,
    role_id: String,
});

let User = mongoose.model('User', schema);

export default User;