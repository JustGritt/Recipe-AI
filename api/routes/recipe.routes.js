const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

module.exports = (app) => {
    const Recipe = require('../controllers/recipe.controller.js');

    // Handle CORS
    const cors = require('cors');
    app.use(cors());

    // Recipe routes
    app.post('/api/recipes', jsonParser, Recipe.create);
    app.put('/api/recipes/:id', jsonParser, Recipe.update);
    app.delete('/api/recipes/:id', jsonParser, Recipe.delete);

    // GET routes
    app.get('/api/recipes', jsonParser, Recipe.findAll);
    app.get('/api/recipes/:id', jsonParser, Recipe.findOne);
};