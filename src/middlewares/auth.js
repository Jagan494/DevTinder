//Middleware to authenticate user using JWT
const jwt = require('jsonwebtoken');    
const User = require('../models/user'); // Assuming you have a User model
const auth = async (req, res, next) => {
    console.log("Auth middleware triggered", req.cookies);
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Check both cookie and header
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }
    try {
        const verifiedToken =await jwt.verify(token, 'namasteDev@123');
        const _id = verifiedToken
        console.log("Token verified:", verifiedToken);
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(401).send("Unauthorized: User not found");
        }       
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).send("Unauthorized: Invalid token");
    }
}
module.exports = {auth}