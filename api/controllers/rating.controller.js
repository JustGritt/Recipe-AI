const Rating = require('../models/rating.model.js');

// Create a new rating for a recipe
exports.createRating = async (req, res) => {
    try {
        const { recipeId, userId, rating, comment } = req.body;
        const newRating = new Rating({ recipeId, userId, rating, comment });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({
            error: 'Error creating a rating.'
        });
    }
};

// Get all ratings for a specific recipe
exports.getRatingsForRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const ratings = await Rating.find({ recipeId });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching ratings for the recipe.'
        });
    }
};