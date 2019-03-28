const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    author: {
        userName: {
            type: String,
            required: true
        },
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default : Date.now()
    },
    category: {
        type: String,
        default: 'miscellaneous'
    },
    tags: [{
        type : String
    }],
    likes: [{
        type: Schema.Types.ObjectId,
    }] 
});

const Post = model('Post', postSchema);

module.exports = Post;