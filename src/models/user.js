const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema
// This schema includes fields for first name, last name, email, password, age, and
const userSchema = mongoose.Schema({    
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    age: {
        type: Number,
        validator(value) {
            return value >= 18 && value <= 100;
        }
    },
    gender: {
        type: String,
        validate: {
            validator: function (value) {
                // should be "male", "female", or "other"
                return ["male", "female", "other"].includes(value);
            }
        }
    }
})

userSchema.methods.getJWT =async function () {
    const token = await jwt.sign({ _id: this._id, emailId: this.emailId }, 'namasteDev@123', {
        expiresIn: '1h' // Token expiration time
    });  
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordhash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordhash);
    return isPasswordValid;
}



module.exports = mongoose.model("users", userSchema); 
