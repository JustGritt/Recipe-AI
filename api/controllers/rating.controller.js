const Rating = require('../models/rating.model.js')
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');


// Create a new rating for a recipe
exports.createRating = async (req, res) => {
    try {
        const { recipeId, token, rating, comment } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = await User.findById(decoded.id);
        const username = userId.username;

        if(!recipeId || !rating || !comment || !token) {
            return res.status(400).json({
                error: 'Missing required fields.'
            });
        }

        const newRating = new Rating({ recipeId, userId, rating, comment, username});
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

