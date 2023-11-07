const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

module.exports = (app) => {
    const User = require('../controllers/user.controller.js');

    // Auth routes
    app.post('/api/register', jsonParser, User.register);
    app.post('/api/login', jsonParser, User.login);
    app.post('/api/verify', jsonParser, User.verifyToken);

    // User routes
    app.get('/api/users', jsonParser, User.findAll);
    app.get('/api/users/:userId', jsonParser, User.findOne);
    app.put('/api/users/:userId', jsonParser, User.update);
    app.delete('/api/users/:userId', jsonParser, User.delete);
};