const User = require('../models/User');
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.add_pin = async (req, res) => {
  try {

    let pinData = {
      post_id: req.body.post_id,
      pin_date: new Date(),
      post_title: req.body.post_title
    }

    let updatedUser = await User.updateOne({ _id: req.params.id }, { $push: { pins: pinData } })
    res.status(200).json()
  }

  catch (err) {
    res.json(500)
  }
}

exports.remove_pin = async (req, res) => {
  try {
    var deleted = await User.update({ _id: req.params.user_id }, { $pull: { pins: { post_id: req.params.post_id } } });
    res.status(200).json();
  }
  catch (err) {
    res.json(500)
  }
}

exports.add_subscription = async (req, res) => {
  try {


    let subCreator = {
      creator_id: req.body.creator_id,
      creator_name: req.body.creator_name,
      date_subscribed: new Date()
    }

    let subUser = {
      subscriber_id: req.body.subscriber_id,
      subscriber_name: req.body.subscriber_name,
      date_subscribed: new Date()
    }

    let updatedSubscriber = await User.updateOne({ _id: req.params.id }, { $push: { subscriptions: subCreator } })
    let updatedCreator = await User.updateOne({ _id: req.body.creator_id }, { $push: { subscribers: subUser } })
    res.status(200).json()
  }

  catch (err) {
    res.json(500)
  }
}

exports.remove_subscription = async (req, res) => {
  try {

    var deletedCreator = await User.updateOne({ _id: req.params.subscriber_id }, { $pull: { subscriptions: { creator_id: req.params.creator_id } } });
    var deletedSub = await User.updateOne({ _id: req.params.creator_id }, { $pull: { subscribers: { subscriber_id: req.params.subscriber_id } } });
    res.status(200).json()
  }
  catch (err) {
    res.json(500)
  }
}

exports.get_userProfile = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    res.json(user)
  }
  catch (err) {
    res.json(500)
  }
}

exports.get_user_posts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.params.id })
    res.json(posts)
  }
  catch (err) {
    res.json(500)
  }
}

exports.get_notifications = async(req, res) => {
  try {
    var notifications = await Notification.find({user_id: req.params.user_id})
    res.json(notifications)
  }
  
  catch(err) {
    
  }
}

exports.update_notification = async(req, res) => {
  try {
    await Notification.updateOne({_id: req.params.notification_id}, {$set : {isRead: true}})
    res.status(200).json()
  }
  
  catch (err) {
    
  }
}

