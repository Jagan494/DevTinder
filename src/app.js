const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());
//add all the routers here
const authRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');
const connectionRequestRouter = require('./routers/connectionRequestRouter');
const userRouter = require('./routers/userRouter')
// why app.use is throuwingg error?
app.use("/", authRouter);
app.use("/", profileRouter)
app.use("/", connectionRequestRouter)
app.use("/", userRouter)

connectDB.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });                 
}).catch(err => {
    console.error("Database connection error:", err);
})
