const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

exports.get_posts = async(req, res) => {
    try {
        var posts = await Post.find({})
        res.json(posts)
    }
    catch (err) {
        res.send(500, {error: 'Error fetching posts'})
    }
}

exports.get_post = async(req, res) => {
    try {
        await Post.updateOne({_id: req.params.id}, {$inc: {views: 1}})
        var post = await Post.findOne({_id: req.params.id})
        res.json(post)
    }
    
    catch (err) {
        res.send(500, {error: 'Error fetching post'})
    }
   
}

exports.get_comments = async(req, res) => {
    try {
        console.log(req.query.page)
        var comments = await Comment.find({post_id: req.params.id}, null, {skip: (parseInt(req.query.page) * 10), limit: 10});
        var count = await Comment.count({post_id: req.params.id});
        res.json({comments, count})
    }
    
    catch (err) {
        console.log(err)
        res.send(500, {error: 'Error fetching commenst'})
    }
    
}

exports.post_comment = async(req, res) => {
    try {
        
        var verified = await jwt.verify(req.body.token, 'secret')
    
        if (!verified) {
            let err = new Error('Invalid Token')
            err.name = 403
            throw err
        }
    
        var comment = await Comment.create({
            post_id: req.params.id,
            date: new Date(),
            user_name: req.body.user_name,
            user_id: req.body.user_id,
            body: req.body.body
        })
        res.status(200).json(comment);
    }
    
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}

exports.create_post = async(req, res) => {
    try {
        var verified = await jwt.verify(req.body.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        
        }
        var created = await Post.create({
            title: req.body.title,
            caption: req.body.caption,
            body: req.body.body,
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            image: req.body.image,
        })
        res.json(created)
    }
    catch(err) {
        res.send(err.name, {error: err.message})
    }
}

exports.like_post = async(req, res) => {
    try {
        var verified = await jwt.verify(req.body.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        }
        await Post.updateOne({_id: req.params.id}, {$addToSet: {likes: req.body.user_id }})
        res.status(200).json();
    }
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}