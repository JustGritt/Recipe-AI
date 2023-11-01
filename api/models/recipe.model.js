const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String,
    difficulty: String,
    calories: Number,
});

module.exports = mongoose.model('Recipe', RecipeSchema, 'recipe');