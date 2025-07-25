const express = require('express');
const app = express();
const { authAdmin, authUser } = require('./middlewares/auth'); // Assuming you have an auth module for admin checks

app.use("/admin", authAdmin);
app.use("/user", authUser, (req, res, next) => {
    res.send("User authenticated");
    next();
});

app.get('/admin/getUser', (req, res, next) => {
    res.send('Admin User');
});

app.post('/admin/deleteUser', (req, res, next) => {
    res.send('Admin Delete User');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

