const User = require('../models/User');
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.addPin = async(req, res) => {
  try {

    let newPin = {
      post: req.body.post,
      pinDate: new Date(),
    }

    let updatedUser = await User.updateOne({ _id: req.params.userId }, { $push: { pins: newPin } })
    res.status(200).json()
  }
  catch (err) {
    res.status(500).json(500)
  }
}

exports.removePin = async(req, res) => {
  try {
    var deleted = await User.update({ _id: req.params.userId }, { $pull: { pins: { 'post._id': req.params.postId } } });
    res.status(200).json();
  }
  catch (err) {
    res.status(500).json()
  }
}

exports.addSubscription = async(req, res) => {
  try {

    console.log(req.body)

    let newSubscription = {
      creator: req.body.creator,
      dateSubscribed: new Date()
    }

    let newSubscriber = {
      subscriber: req.body.subscriber,
      dateSubscribed: new Date()
    }

    let updatedSubscriber = await User.updateOne({ _id: req.params.subscriberId }, { $push: { subscriptions: newSubscription } })
    let updatedCreator = await User.updateOne({ _id: req.body.creatorId }, { $push: { subscribers: newSubscriber } })
    res.status(200).json()
  }

  catch (err) {
    res.status(500).json()
  }
}

exports.removeSubscription = async(req, res) => {
  try {
    var deletedCreator = await User.updateOne({ _id: req.params.subscriberId }, { $pull: { subscriptions: { 'creator._id': req.params.creatorId } } });
    var deletedSubscriber = await User.updateOne({ _id: req.params.creatorId }, { $pull: { subscribers: { 'subscriber._id': req.params.subscriberId } } });
    res.status(200).json()
  }
  catch (err) {
    res.status(500).json()
  }
}

exports.getUserProfile = async(req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.userId })
    res.json(user)
  }
  catch (err) {
    res.status(500).json()
  }
}

exports.getUserPosts = async(req, res) => {
  try {

    let posts;

    if (req.query.limit) {
      posts = await Post.find({ 'author._id': req.params.userId }).limit(5)
    }

    else {
      posts = await Post.find({ 'author._id': req.params.userId })
    }

    res.json(posts)
  }
  catch (err) {
    res.status(500).json()
  }
}

exports.getNotifications = async(req, res) => {
  try {
    var notifications = await Notification.find({ user_id: req.params.userId })
    res.json(notifications)
  }

  catch (err) {
    res.status(500).json()
  }
}

exports.updateNotification = async(req, res) => {
  try {
    await Notification.updateOne({ _id: req.params.notificationId }, { $set: { isRead: true } })
    res.status(200).json()
  }

  catch (err) {
    res.status(500).json()
  }
}
