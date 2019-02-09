const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.get_posts = async(req, res) => {
    var posts = await Post.find({})
    console.log(posts)
    res.json(posts)
}

exports.get_post = async(req, res) => {
    console.log('HIT')
    var post = await Post.findOne({_id: req.params.id})
    var comments = await Comment.find({post_id: post._id})
    res.json({
        post,
        comments
    })
}