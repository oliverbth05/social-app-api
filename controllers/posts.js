const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.get_posts = async(req, res) => {
    var posts = await Post.find({})
    res.json(posts)
}

exports.get_post = async(req, res) => {
    await Post.updateOne({_id: req.params.id}, {$inc: {views: 1}})
    var post = await Post.findOne({_id: req.params.id})
    var comments = await Comment.find({post_id: post._id})
    res.json({
        post,
        comments
    })
}

exports.create_post = async(req, res) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            image: req.body.image,
        })
        res.redirect('/home')
    }
    catch(err) {
        
    }
}

exports.like_post = async(req, res) => {
    try {
        console.log('liked')
        await Post.updateOne({_id: req.params.id}, {$addToSet: {likes: req.body.user_id }})
        res.status(200).json();
    }

    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}