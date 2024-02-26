// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Remove whitespace
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'default-avatar.png' // Or a similar default     
    },
    online: {
        type: Boolean,
        default: false
    }
});

// Hash password before saving a new user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip if the password hasn't changed
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
