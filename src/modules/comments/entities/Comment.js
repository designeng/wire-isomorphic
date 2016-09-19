import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
    pid: Schema.Types.ObjectId,
    uid: Schema.Types.ObjectId,
    title:    String,
    body:    String,
    created: { type: Date, default: Date.now },
});

let Comment = mongoose.model('Comment', schema);

export default Comment;