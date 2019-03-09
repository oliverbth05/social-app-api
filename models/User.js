const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    join_date: Date,
    summary: {
        type: String,
        default: 'No summary provided'
    },
    pins: [{}],
    subscriptions: [{}],
    subscribers: [{}],
    notifications: [{}],
    unread_notifications: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;