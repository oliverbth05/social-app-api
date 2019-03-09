const User = require('../models/User');
const Post = require('../models/Post');

const jwt = require('jsonwebtoken');

exports.add_pin = async(req, res) => {
  try {
    
    let verified = await jwt.verify(req.body.token, 'secret')
    
    if (!verified) {
      let err = new Error('invalid token')
      err.name = 403
      throw err
    } 

    let pinData = {
      post_id: req.body.post_id,
      pin_date: new Date(),
      post_title: req.body.post_title
    }
  
    let updatedUser = await User.updateOne({_id: req.params.id}, {$push: {pins: pinData}})
    res.status(200).json()
    
  }

  catch (err) {
    res.send(err.name, {error: err.message})
  }
}

exports.remove_pin = async(req, res) => {
  try {
    var deleted = await User.update({ _id: req.params.user_id }, { $pull: { pins: { post_id: req.params.post_id } } } );
    console.log(deleted)
    res.status(200).send();
  } 
  catch (err) {
    console.log(err)
  }
}

exports.add_subscription = async(req, res) => {
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
    
    let updatedSubscriber = await User.updateOne({_id: req.params.id}, {$push: {subscriptions : subCreator}})
    let updatedCreator = await User.updateOne({_id: req.body.creator_id}, {$push : {subscribers: subUser}})
    res.status(200).json()
    
  }
  
  catch (err) {
    console.log(err)
  }
}

exports.remove_subscription = async(req, res) => {
  console.log(req.params.subscriber_id, req.params.creator_id)
  try {
    var deletedCreator = await User.updateOne({ _id: req.params.subscriber_id}, {$pull: {subscriptions: {creator_id: req.params.creator_id}}});
    var deletedSub = await User.updateOne({ _id: req.params.creator_id}, {$pull: {subscribers: {subscriber_id: req.params.subscriber_id}}});
    res.status(200).json() 
  }
  catch (err) {
    console.log(err)
  }
}

exports.get_userProfile = async(req, res) => {
  try {
    let user = await User.findOne({_id: req.params.id})
    res.json(user)
  }
  catch (err) {
    console.log(err)
  }
}

exports.get_user_posts = async(req, res) => {
  try {
    const posts = await Post.find({user_id: req.params.id})
    res.json(posts)
  }
  catch (err) {
    
  }
}