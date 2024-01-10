const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

module.exports = (app) => {
    const Recipe = require('../controllers/recipe.controller.js');

    // Recipe routes
    app.post('/api/recipes', jsonParser, Recipe.create);
    app.put('/api/recipes/:id', jsonParser, Recipe.update);
    app.delete('/api/recipes/:id', jsonParser, Recipe.delete);

    // GET routes
    app.get('/api/recipes', jsonParser, Recipe.findAll);
    app.get('/api/recipes/:id', jsonParser, Recipe.findOne);
    app.get('/api/recipes/name/:name', jsonParser, Recipe.findByName);
};