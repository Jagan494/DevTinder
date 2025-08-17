const validator = require('validator');

const validateUser = (user) => {
    if (!user.firstName || !user.emailId || !user.password) {
        throw new Error("Name, email, and password are required");
    }
    if (typeof user.age !== 'number' || user.age <= 0) {
        throw new Error("Age must be a positive number");
    }
    if (user.firstName?.length < 2 || user.firstName?.length > 50) {
        throw new Error("Name must be between 2 and 50 characters");
    }
    if (!validator.isEmail(user.emailId)) {
        throw new Error("Invalid email format");
    }
    if(!validator.isStrongPassword(user.password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    })) {   
        throw new Error("Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number");
    }
    // Additional validation logic can be added here
}

const validateEditProfileData = (data) => {
    console.log("Data received for validation:", data);
    const allowedFieldsToUpdate = ['firstName', 'lastName', 'photoUrl', 'age','gender'];
    const isUpdatedAllowed = Object.keys(data).every(key => {
        if (!allowedFieldsToUpdate.includes(key)) {
            throw new Error(`Invalid update field: ${key}`);
        }
        return true;
    });
    console.log("Is update allowed:", isUpdatedAllowed);
    if (!isUpdatedAllowed) {
        throw new Error("Invalid update fields");
    }
}
module.exports = { validateUser, validateEditProfileData };