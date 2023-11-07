const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

module.exports = (app) => {
    const Rating = require('../controllers/rating.controller.js');

    // Recipe routes
    app.post('/api/ratings', jsonParser, Rating.createRating);
    app.get('/api/ratings/:recipeId', jsonParser, Rating.getRatingsForRecipe);
};