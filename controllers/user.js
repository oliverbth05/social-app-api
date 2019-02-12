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