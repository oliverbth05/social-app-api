const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Notification = require('../models/Notification');

exports.login = async(req, res) => {

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

    catch (err) {
        console.log(err)
        res.send(err.name, { error: err.message })
    }
}

exports.register = async(req, res) => {

    try {
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) {
            let err = new Error('User already exists')
            err.name = 400
            throw err
        }
        var newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            joinDate: new Date(),
        })

        var notification = Notification.create({
            user_id: newUser._id,
            title: 'Welcome to Rag',
            body: 'Head to the Write page in the navigation to create your first post.',
            date: new Date(),
            isRead: false
        })
        var token = jwt.sign({ id: newUser._id }, 'secret', { expiresIn: 86400 }) // expires in 24 hours
        res.json({ user: newUser, token, })
    }
    catch (err) {
        console.log(err)
        res.send(err.name, { error: err.message })
    }
}
