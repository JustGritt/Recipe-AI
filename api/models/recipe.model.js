const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: [String],
    difficulty: String,
    picture: String,
    calories: Number,
    tags: [String],
});

module.exports = mongoose.model('Recipe', RecipeSchema, 'recipes');