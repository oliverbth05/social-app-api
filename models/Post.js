const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    caption: String,
    body: String,
    views: {
        type: Number,
        default: 0
    },
    image: String,
    user_id: String,
    user_name: String,
    date: {
        type: Date,
        default : Date.now()
    },
    tags: [{
        type : String
    }],
    likes: [{
        type: String,
    }] 
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;