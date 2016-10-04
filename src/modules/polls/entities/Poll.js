import mongoose, { Schema } from 'mongoose';

let PollSchema = new Schema({
    title: String,
    created: { type: Date, default: Date.now },
    questions: [{ body: String }]
});

let Poll = mongoose.model('Poll', PollSchema);

export default Poll;