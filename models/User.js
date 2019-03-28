const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    password:  { 
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    pins: [{
        post: {
            _id: {
                type: Schema.Types.ObjectId
            },
            title: {
                type: String
            }
        },
        pinDate: {
            type: Date,
            default: Date.now()
        }
    }],
    subscriptions: [{
        creator: {
            _id: {
                type: Schema.Types.ObjectId
            },
            userName: {
                type: String
            }
        },
        dateSubscribed: {
            type: Date,
            default: Date.now()
        }
    }],
    subscribers: [{
        subscriber: {
            _id: {
                type: Schema.Types.ObjectId
            },
            userName: {
                type: String
            }
        },
        dateSubscribed: {
            type: Date,
            default: Date.now()
        }
    }],
});

const User = model('User', userSchema);

module.exports = User;