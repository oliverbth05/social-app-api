const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Notification = model('Notification', notificationSchema)

module.exports = Notification;
