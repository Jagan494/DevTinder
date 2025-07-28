const mongoose = require('mongoose');
const connectDB = require('./config/database');
const express = require('express');
const app = express();
const User = require('./models/user');

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/signup',async (req, res) => {
    console.log("Request body:", req.body);
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send("User created successfully")
    } catch (error) {
        res.status(400).send("Error creating user: " + error.message);
    }
})

connectDB.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });                 
}).catch(err => {
    console.error("Database connection error:", err);
})
