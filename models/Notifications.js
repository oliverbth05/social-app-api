const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
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