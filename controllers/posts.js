const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

exports.get_posts = async(req, res) => {
    try {
        
        var sortQuery;
        if (req.query.sort ==='Recent') {
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
            sortQuery =  {
                $sort: {
                    views: -1
                }
            } 
        }
        else {
            sortQuery = null
        } 
        
        const currentPage = req.query.page || 1;
        const perPage = 25;
        const page = ((currentPage - 1) * perPage)
        
        if (req.query.searchTerm === '') {
            const posts = await Post.aggregate([
                {$match : {title : { '$regex' : req.query.searchTerm, '$options' : 'i'}}},
                {$project: { likeCount: { $size: "$likes" }, title: "$title", user_name: "$user_name", date: '$date', image: '$image', views: '$views', tags: '$tags'}},
                sortQuery,
                {$skip: page},
                {$limit: perPage},
            ])
            res.json(posts)
        }
        
        else {
            const posts = await Post.aggregate([
            {$project: { likeCount: { $size: "$likes" }, title: "$title", user_name: "$user_name", date: '$date', image: '$image', views: '$views', tags: '$tags'}},
            sortQuery,
            {$skip: page},
            {$limit: perPage},
        ])
        res.json(posts)
        }
        
        
        
        
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
        const currentPage = req.query.page || 1;
        const perPage = 10;
        const page = ((currentPage - 1) * perPage)
        var comments = await Comment.find({post_id: req.params.id}, null, {skip: page, limit: perPage, sort: {date: -1}});
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
            tags: req.body.tags,
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
        
    }
}

exports.get_comment = async(req, res) => {
    try {
        var comment = await Comment.findOne({_id: req.params.id})
        res.json(comment)
    }
    
    catch(err) {
        res.send(err.name, {error: err.message})
    }
}

exports.update_comment = async(req, res) => {
    try {
        var verified = await jwt.verify(req.body.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        }
        var updated = await Comment.updateOne({_id: req.body._id}, { $set: {body: req.body.body}});
        res.status(200).send()
    }
    
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}

exports.delete_comment = async(req, res) => {
    try {
        var verified = await jwt.verify(req.query.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        }
        
        var deleted = await Comment.deleteOne({_id: req.params.id})
        res.status(200).json()
    }
    
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}

exports.update_post = async(req, res) => {
    try {
        var verified = await jwt.verify(req.body.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        }
        
        var updated = await Post.updateOne({_id: req.body._id}, {$set: {
            title: req.body.title,
            caption: req.body.caption,
            body: req.body.body,
            tags: req.body.tags,
            image: req.body.image
        }})
        
        res.status(200).json()
    }
    
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}

exports.delete_post = async(req, res) => {
    try {
        var verified = await jwt.verify(req.query.token, 'secret')
        if (!verified) {
            let err = new Error('invalid token')
            err.name = 403
            throw err
        }
        
        console.log(req.body)
        
        var deletedPost = await Post.deleteOne({_id: req.params.id})
        var deleteComments = await Comment.deleteMany({post_id: req.params.id})
        
        console.log(deletedPost)
        res.status(200).json()
    }
    
    catch (err) {
        
    }
}

exports.search_posts = async(req, res) => {
    try {
        
        
        
        var sort;
        
        if (req.query.sort === 'date') {
            sort = {
                date: -1
            }
        }
        
        else if (req.query.sort === 'views') {
            sort = {
                views: -1
            }
        }
        
        else if (req.query.sort === 'likes') {
            sort = {
                likeCount: -1
            }
        }
        
        else {
            sort = {
                date: -1
            }
        }
        console.log(sort)
        
        const currentPage = req.query.page || 1;
        const perPage = 25;
        const page = ((currentPage - 1) * perPage)
        
        const results = await Post.aggregate(
            [
            {$match : {title : { '$regex' : req.query.searchTerm, '$options' : 'i'}}},
            {$project: { likeCount: { $size: "$likes" }, title: "$title", user_name: "$user_name", date: '$date', image: '$image', views: '$views', tags: '$tags'}},
            {$sort: sort},
            {$skip: page},
            {$limit: perPage}
            ]
        )
        
        res.json(results)
    }
    
    catch (err) {
        console.log(err)
    }
}