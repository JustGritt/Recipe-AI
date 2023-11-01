const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// =====================================================
// Database
// =====================================================

// Connect to database
const connectDB = async() => {
    try {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(mongoose.connection.readyState === 1 ?
                "Connection to Mongo ready!" :
                "Connection to Mongo failed!"
            );
        })
        .catch((err) => {
            console.error("Could not connect to database: ", err);
            process.exit(1);
        })
    } catch (err) {
        console.error("Error connecting to database: ", err);
    }
};

// =====================================================
// API Routes
// =====================================================

const app = express();
require('./routes/user.routes')(app);
require('./routes/recipe.routes')(app);

app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" });
});

// =====================================================
// Server log
// =====================================================

app.listen(process.env.SERVER_PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    console.log(`http://localhost:${process.env.SERVER_PORT}\n`);
});
