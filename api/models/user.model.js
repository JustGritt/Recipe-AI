const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    filters: {
        type: Array,
        default: [],
    },
    shopping_lists: {
        type: Array,
        default: [],
    },
    favourites: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Handle password encryption
UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);