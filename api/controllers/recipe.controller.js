const Recipe = require('../models/recipe.model.js');

// =======================================
// Basic routes
// =======================================

exports.create = async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        calories: req.body.calories,
    });

    try {
        const savedRecipe = await recipe.save();
        console.log(savedRecipe);
        res.status(200).send({ message: 'Recipe created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the recipe.' });
    }
};

exports.update = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found.' });
        }

        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.instructions = req.body.instructions;
        recipe.difficulty = req.body.difficulty;
        recipe.calories = req.body.calories;

        const updatedRecipe = await recipe.save();
        res.status(200).send({ message: 'Recipe updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while updating the recipe.' });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.status(200).send({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while deleting the recipe.' });
    }
};

// =======================================
// Find routes
// =======================================

exports.findOne = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.status(200).send({ recipe });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while finding the recipe.' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send({ recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while finding the recipes.' });
    }
};