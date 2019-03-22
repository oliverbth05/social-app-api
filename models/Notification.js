const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now()
    },
    isRead: {
        type: Boolean,
        default: false 
    }
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification;