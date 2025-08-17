const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user');
const { auth } = require('../middlewares/auth');
const {  validateEditProfileData, validateUser } = require('../utils/helper');
const bcrypt = require('bcrypt')

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

profileRouter.patch("/profile/edit", auth ,async (req, res) => {
    if(validateEditProfileData(req.body)){
        return res.status(400).send("Invalid update fields");
    }
    const userId = req.user._id; // Get user ID from authenticated request
    const updateData = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log("User updated successfully:", user);
        res.status(200).send("User updated successfully");
    } catch (error) {
        res.status(500).send("Error updating user: " + error.message);
    }   
})

// Endpoint to update the password
profileRouter.patch('/profile/update-password',auth ,async (req, res) =>{
    // Scenario1 - If the user is logged in, he will have jwt token
    try {
        const { firstName, lastName, emailId, password, age, gender} = req.user
        const saltRounded = 10
        const salt = await bcrypt.genSalt(saltRounded);
        console.log("salt", salt)
        const newPassword = req.body.password
        console.log("new Password", newPassword)
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        console.log("Password hashed", hashedPassword)
        const id = req.user._id
        const newUser = await User.findByIdAndUpdate(id,{password: hashedPassword})
        console.log("password successfully:", newUser);  
        res.status(200).send("Password updated successfully")
    } catch (error) {
        console.log("error", error)
        res.status(500).send("Error in updating the password", error)
    }
})


module.exports = profileRouter;
