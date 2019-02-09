const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.post_login = async (req, res) => {
    var user = await User.findOne({email: req.body.email})
    if (!user) {
        res.status(401).json();
    }
    var isValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isValid) {
        res.status(401).json();
    }
    
    var token = 'ASDASDASDDD!@#123123asaWqwe123sdzxa0034-';
    res.json({user, token})
}