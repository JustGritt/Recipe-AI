const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    username: {
        type: String,
        ref: 'User',
    },
    rating: Number,
    comment: String,
});

module.exports = mongoose.model('Rating', RatingSchema);