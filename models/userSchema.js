const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell me your name']
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        unique: true,
        lowercase: true,

    },
    photo: String,
    password: {
        type: String,
        required: [true, 'please provide a password']
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;