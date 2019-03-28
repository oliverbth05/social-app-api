const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true
        } 
    },
    post: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        type: Schema.Types.ObjectId,
    }]
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
