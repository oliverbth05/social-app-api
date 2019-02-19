const User = require('../models/User');
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

exports.get_userProfile = async(req, res) => {
  try {
    let user = await User.findOne({_id: req.params.id})
    res.json(user)
  }
  
  catch (err) {
    console.log(err)
  }
}