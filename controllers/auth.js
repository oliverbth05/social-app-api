const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.post_login = async (req, res) => {
    
    try {
        let user = await User.findOne({ email: req.body.email })
        
        if (!user) {
            let err = new Error('User does not exist.');
            err.name = 400 
            throw err
        }
        
        let isValid = bcrypt.compareSync(req.body.password, user.password)
        if (!isValid) {
            let err = new Error('Incorrect Password');
            err.name = 400
            throw err
        }
        var token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 86400 }) // expires in 24 hours
        res.json({ user, token })
        }
    
    catch (err){
        console.log(err)
        res.send(err.name, {error: err.message})
    }
}

exports.post_register = async (req, res) => {
    
    try {
        let doesExist = await User.findOne({ email: req.body.email });

        if (doesExist) {
            let err = new Error('User already exists')
            err.name = 400
            throw err
        }

        var newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            join_date: new Date()
        })

        var token = jwt.sign({ id: newUser._id }, 'secret', { expiresIn: 86400 }) // expires in 24 hours
        res.json({ user: newUser, token, })
    }
    
    catch (err) {
        res.send(err.name, {error: err.message})
    }
}