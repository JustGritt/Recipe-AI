const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// =====================================================
// Use methods
// =====================================================
app.use(cors());
app.use(express.json());

// =====================================================
// Handle Database connection
// =====================================================
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// =====================================================
// Users routes
// =====================================================
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// =====================================================
// =====================================================

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
