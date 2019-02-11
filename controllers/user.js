const User = require('../models/User');

exports.add_pin = async(req, res) => {
  try {

    let pinData = {
      post_id: req.body.post_id,
      pin_date: new Date(),
      post_title: req.body.post_title
    }
  
    let updatedUser = await User.updateOne({_id: req.params.id}, {$push: {pins: pinData}})
    res.status(200).json()
    
  }

  catch (err) {

  }
}