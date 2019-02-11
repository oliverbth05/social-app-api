const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.post_login = async (req, res) => {
    var user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(401).json();
    }
    var isValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isValid) {
        res.status(401).json();
    }

    var token = 'ASDASDASDDD!@#123123asaWqwe123sdzxa0034-';
    res.json({ user, token })
}

exports.post_register = async (req, res) => {

    const doesExist = await User.findOne({ email: req.body.email });

    if (doesExist) {
        res.status(400).json()
    }

    console.log(
        req.body
    )

    var newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })

    console.log(newUser)

    res.json({ user: newUser, token: 'ASDASD ASDa sdj12328u3 ha h' })

}