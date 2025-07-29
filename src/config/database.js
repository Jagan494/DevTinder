const mongoose = require('mongoose');

const connectDB = mongoose.connect("mongodb+srv://jpcloud494:AQZHom1PzTintqey@namastenodejs.skqcrui.mongodb.net/DevTinder").then
(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

module.exports = connectDB;