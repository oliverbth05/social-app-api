const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

exports.get_all_stats = async(req, res) => {
    const comments = await Comment.count({})
    const users = await User.count({})
    const posts = await Post.count({})
    
    res.json({comments, users, posts})
}