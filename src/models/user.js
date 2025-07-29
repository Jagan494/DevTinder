const mongoose = require('mongoose');

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

module.exports = mongoose.model("users", userSchema); 
