const authAdmin = (req, res, next) => {
    // Middleware to log request method and URL
    console.log(`Admin Request Method: ${req.method}, Request URL: ${req.url}`);
    const token = "admin-token"; // Example token for admin authentication
    isAdminAuthenticated = token === "admin-token"; // Simulated admin authentication check
    // Proceed to the next middleware or route handler if authenticated
    if (isAdminAuthenticated) {
        next();}    
    else {
        res.status(403).send('Forbidden: Admin access required');
    }
}

const authUser = (req, res, next) => {
    // Middleware to log request method and URL
    console.log(`User Request Method: ${req.method}, Request URL: ${req.url}`);
    const token = "user-token"; // Example token for admin authentication
    isUserAuthenticated = token === "user-token"; // Simulated admin authentication check
    // Proceed to the next middleware or route handler if authenticated
    if (isUserAuthenticated) {
        next();}    
    else {
        res.status(403).send('Forbidden: Admin access required');
    }
}

module.exports = {authAdmin, authUser}