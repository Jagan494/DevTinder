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
    // Additional validation logic can be added here
}

module.exports = { validateUser };