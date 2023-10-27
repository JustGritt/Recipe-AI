const User = require('../models/user.model.js');

// Imports for auth
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =======================================
// Auth routes
// ?TODO - Move to auth.controller.js
// =======================================

exports.register = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.status(200).send({ message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the user.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({ message: 'Invalid email or password.' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful.', token: token });
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ message: 'An error occurred while logging in.' });
    }
}

exports.verifyToken = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) return res.status(401).send({ message: 'No token provided.' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).send({ message: 'Invalid token.' });

        res.status(200).send({ status: 'success', message: 'Token verified.' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).send({ message: 'An error occurred while verifying the token.' });
    }
}


// =======================================
//
// =======================================

exports.delete = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while deleting the user.' });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while updating the user.' });
    }
};

// =======================================
//
// =======================================

exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while finding the user.' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while finding the users.' });
    }
};