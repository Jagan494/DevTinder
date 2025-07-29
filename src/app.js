const mongoose = require('mongoose');
const connectDB = require('./config/database');
const express = require('express');
const app = express();
const User = require('./models/user');
const { validateUser } = require('./utils/helper');
const bcrypt = require('bcrypt');


app.use(express.json()); // Middleware to parse JSON bodies

app.get('/users', async (req, res) => {
    try {   
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).send("No users found");
        }
        res.status(200).send(users);
    }   catch (error) {
        res.status(500).send("Error fetching users: " + error.message);     
    }
})

app.post('/signup',async (req, res) => {
    
    console.log("Received request body:", req.body);
    try {
        //validate the request body
        validateUser(req.body);
        const{ firstName, lastName, emailId, password, age, gender} = req.body
        
        //enccrypt the password 
        const passwordHash =  await bcrypt.hash(password, 10);
        console.log("Password hash:", passwordHash);

        //create a new user

        console.log("Request body:", req.body);
        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender
        });
        await newUser.save({
            validateBeforeSave: true,
            runValidators: true
        });
        res.status(201).send("User created successfully")
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).send("Error creating user: " + error.message);
    }
})

app.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }
        res.status(200).send("Login successful");
    }
    catch (error) {
        res.status(500).send("Error logging in: " + error.message); 
    }
})


// User api - get /user get user by email from the database
app.get('/user', async (req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({emailId: email})
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }else{
            console.log("User found:", user);
            res.status(200).send(user);
        } 
    }catch (error) {
        res.status(500).send("Error fetching user: " + error.message);
    }
    
})

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }else{
            console.log("User deleted:", user);
            res.status(200).send("User deleted successfully");
        }
    }catch(error) {
        res.status(500).send("Error deleting user: " + error.message);  
    }
});


// Update user api - put /user update user by email from the database


app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const updateData = req.body;
    try {
        const ALLOWED_UPDATES = ['firstName', 'lastName', 'age', 'gender']
        isUpdateAllowed = Object.keys(updateData).every(k=> {
            if (!ALLOWED_UPDATES.includes(k)) {
                throw new Error(`Invalid update field: ${k}`);
            }
            return true;
        })
        if (!isUpdateAllowed) {
            return res.status(400).send("Invalid update fields");
        }else {
            console.log("Update data:", updateData);
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true },{returnDocument: 'after'});
            if (!user) {
                return res.status(404).send("User not found");
            } else {    
                console.log("User updated:", user);
                res.status(200).send(user);
            }
        }
        
    } catch (error) {
        res.status(500).send("Error updating user: " + error.message);
    }
});
// Feed api - get /feed fet all users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).send("No users found");
        }
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
    }
})



connectDB.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });                 
}).catch(err => {
    console.error("Database connection error:", err);
})
