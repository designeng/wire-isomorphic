import mongoose, { Schema } from 'mongoose';

function IdentityPlugin(schema) {
    schema.pre('save', function(data) {
        console.log('DATA:::', data);
    });
}

let schema = new Schema({
    title:    String,
    created: { type: Date, default: Date.now },
    // array with moderators logins
    moderators: [String],
    type: String,
    last_activity: Date,
    last_visit: Date,
});

// schema.plugin(IdentityPlugin);

let Forum = mongoose.model('Forum', schema);

export default Forum;