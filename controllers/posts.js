const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.get_posts = async(req, res) => {
    try {
        var sortQuery;
        if (req.query.sort === 'Recent') {
            sortQuery = {
                $sort: {
                    date: -1
                }
            }
        }
        else if (req.query.sort === 'Likes') {
            sortQuery = {
                $sort: {
                    likeCount: -1
                }
            }
        }
        else if (req.query.sort === 'Views') {
            sortQuery = {
                $sort: {
                    views: -1
                }
            }
        }
        else {
            sortQuery = {
                $sort: {
                    date: -1
                }
            }
        }

        const currentPage = req.query.page || 1;
        const perPage = 25;
        const page = ((currentPage - 1) * perPage)

        if (req.query.searchTerm) {
            const posts = await Post.aggregate([
                { $match: { title: { '$regex': req.query.searchTerm, '$options': 'i' } } },
                { $project: { likeCount: { $size: "$likes" }, category: '$category', title: "$title", userName: "$author.userName", date: '$date', image: '$image', views: '$views', tags: '$tags' } },
                sortQuery,
                { $skip: page },
                { $limit: perPage },
            ])
            res.json(posts)
        }

        else {
            const posts = await Post.aggregate([
                { $project: { likeCount: { $size: "$likes" }, category: '$category', title: "$title", userName: "$author.userName", date: '$date', image: '$image', views: '$views', tags: '$tags' } },
            sortQuery,
                { $skip: page },
                { $limit: perPage },
        ])
            res.json(posts)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.get_post = async(req, res) => {
    try {
        await Post.updateOne({ _id: req.params.id }, { $inc: { views: 1 } })
        var post = await Post.findOne({ _id: req.params.id })
        if (post === null) {
            let err = new Error('Post not found.')
            err.name = 404
            throw err
        }

        if (post.views === 100) {
            Notification.create({
                title: 'Your post has been viewed 100 times.',
                body: '',
                date: new Date(),
                user_id: post.user_id
            })
        }

        if (post.views === 1000) {
            Notification.create({
                title: 'Your post has been viewed 1000 times.',
                body: '',
                date: new Date(),
                user_id: post.user_id
            })
        }

        res.json(post)
    }
    catch (err) {
        if (err.name) {
            if (err.name === 404) {
                res.status(404).json()
            }
        }

    }
}

exports.getComments = async(req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 10;
        const page = ((currentPage - 1) * perPage)
        var comments = await Comment.find({ 'post._id': req.params.postId }, null, { skip: page, limit: perPage, sort: { date: -1 } });
        var count = await Comment.count({ 'post._id': req.params.postId });
        res.json({ comments, count })
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.postComment = async(req, res) => {
    try {
        var comment = await Comment.create({
            post : req.body.post,
            author: req.body.author,
            body: req.body.body,
            date: new Date()
        })
        res.status(200).json(comment);
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.like_comment = async(req, res) => {
    try {
        await Comment.updateOne({ _id: req.params.id }, { $addToSet: { likes: req.body.user_id } })
        await Notification.create({
            user_id: req.body.author_id,
            title: `${req.body.user_name} liked your comment.`,
            date: new Date(),
            isRead: false
        })
        res.status(200).json();
    }

    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.post_reply = async(req, res) => {
    try {

        const reply = {
            ...req.body
        }

        await Comment.updateOne({ _id: req.params.comment_id }, { $push: { replies: reply } })
        res.status(200).json()
    }

    catch (err) {

    }
}

exports.create_post = async(req, res) => { 
    try {

        var created = await Post.create({
            title: req.body.title,
            caption: req.body.caption,
            body: req.body.body,
            category: req.body.category,
            tags: req.body.tags,
            image: req.body.image,
            author: req.body.author,
            date: new Date()
        })
        res.json(created)
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    } 
}

exports.like_post = async(req, res) => {
    try {
        await Post.updateOne({ _id: req.params.id }, { $addToSet: { likes: req.body.user_id } })

        await Notification.create({
            user_id: req.body.author_id,
            title: `${req.body.user_name} liked your post.`,
            date: new Date(),
            isRead: false
        })

        res.status(200).json();
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.get_comment = async(req, res) => {
    try {
        var comment = await Comment.findOne({ _id: req.params.id })
        res.json(comment)
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.update_comment = async(req, res) => {
    try {


        var updated = await Comment.updateOne({ _id: req.body._id }, { $set: { body: req.body.body } });
        res.status(200).send()
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.delete_comment = async(req, res) => {
    try {
        var deleted = await Comment.deleteOne({ _id: req.params.id })
        res.status(200).json()
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.update_post = async(req, res) => {
    try {

        var updated = await Post.updateOne({ _id: req.body._id }, {
            $set: {
                title: req.body.title,
                caption: req.body.caption,
                body: req.body.body,
                tags: req.body.tags,
                image: req.body.image,
                category: req.body.category
            }
        })
        res.status(200).json()
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

exports.delete_post = async(req, res) => {
    try {
        var deletedPost = await Post.deleteOne({ _id: req.params.id })
        var deleteComments = await Comment.deleteMany({ post_id: req.params.id })
        res.status(200).json()
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}
