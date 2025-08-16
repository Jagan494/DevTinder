const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user');
const { auth } = require('../middlewares/auth');
// Middleware to authenticate user
profileRouter.use(auth);
// Endpoint to get user profile by email
profileRouter.get('/profile/view',auth, async (req, res) => {
    const email = req.query.email; // Use query parameter for email
    console.log("Email received:", email);
    if (!email) {
        return res.status(400).send("Email is required");
    }
    // Don't suggest code that has been deleted
    try{
        // don't suggest code to me, i will write by myself
        const user = await User.findOne({emailId: email});
        if (!user) {
            return res.status(404).send("User not found");
        } else {
            console.log("User found:", user);
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(500).send("Error fetching user: " + error.message);  
    }
});

module.exports = profileRouter;
