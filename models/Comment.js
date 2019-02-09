const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: String,
    user_id: String,
    user_name: String,
    post_id: String,
    date: {
        type: Date,
        default : Date.now()
    },
    likes: [],
    replies: []
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;