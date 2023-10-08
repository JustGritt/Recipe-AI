const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Find a user by id
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.username);
});

// Register a new user
router.post('/register', async(req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user by id
router.delete('/:id', (req, res) => {
    res.send('Hello from users route');
});

// Update a user by id
router.patch('/:id', (req, res) => {
    res.send('Hello from users route');
});

// Middleware function to get a user by id
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

//
router.post('/login', (req, res) => {
    res.send('Hello from users route');
});

module.exports = router;
