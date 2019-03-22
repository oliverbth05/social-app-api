const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    join_date: Date,
    pins: [{}],
    subscriptions: [{}],
    subscribers: [{}],
});

const User = mongoose.model('User', userSchema);

module.exports = User;