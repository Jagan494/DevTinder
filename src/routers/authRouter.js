const authRouter = require('express').Router();
const User = require('../models/user');
const { validateUser } = require('../utils/helper');
const bcrypt = require('bcrypt');


authRouter.post('/signup', async (req, res) => {
    try{
        validateUser(req.body)
        const { firstName, lastName, emailId, password, age, gender} = req.body
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password with a salt rounds of 10
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : hashedPassword,
            age,
            gender
        })
        const newUser = await user.save();
        console.log("User created successfully:", newUser);
        res.status(201).send("User created successfully");
    }catch(error){
        res.status(400).send("Error creating user: " + error.message);
    }
})

authRouter.post('/login', async (req, res)=>{
    const{ emailId, password} = req.body
    try{
        const user = await User.findOne({emailId: emailId})
        console.log("User found:", user);
        if(!user){
            return res.status(403).send("User not found")
        }
        const isMatch = await user.validatePassword(password)
        console.log("Password match:", isMatch);
        if(isMatch){
            const token = await user.getJWT()
            console.log("Token generated:", token);
            res.cookie('token', token)
            return res.status(200).send("Login successful")
        }
        res.status(403).send("incorrect password")

    }catch(error){
        res.status(500).send("Error logging in: " + error.message)
    }
    
})

module.exports = authRouter
