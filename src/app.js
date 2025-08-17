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






// //add /profile endpoint to get user profile by email
// app.get('/profile',auth, async (req, res) => {
//     // const {token} = req.cookies; // Use query parameter for email
//     // console.log("Token received:", token);
//     // if (!token) {
//     //     return res.status(401).send("Unauthorized: No token provided");
//     // }
    
// })

// // User api - get /user get user by email from the database
// app.get('/user', async (req, res) => {
//     const email = req.body.email;
//     try{
//         const user = await User.findOne({emailId: email})
//         if (user.length === 0) {
//             return res.status(404).send("User not found");
//         }else{
//             console.log("User found:", user);
//             res.status(200).send(user);
//         } 
//     }catch (error) {
//         res.status(500).send("Error fetching user: " + error.message);
//     }
    
// })

// app.delete('/user', async (req, res) => {
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             return res.status(404).send("User not found");
//         }else{
//             console.log("User deleted:", user);
//             res.status(200).send("User deleted successfully");
//         }
//     }catch(error) {
//         res.status(500).send("Error deleting user: " + error.message);  
//     }
// });


// // Update user api - put /user update user by email from the database


// app.patch('/user', async (req, res) => {
//     const userId = req.body.userId;
//     const updateData = req.body;
//     try {
//         const ALLOWED_UPDATES = ['firstName', 'lastName', 'age', 'gender']
//         isUpdateAllowed = Object.keys(updateData).every(k=> {
//             if (!ALLOWED_UPDATES.includes(k)) {
//                 throw new Error(`Invalid update field: ${k}`);
//             }
//             return true;
//         })
//         if (!isUpdateAllowed) {
//             return res.status(400).send("Invalid update fields");
            
//         }else {
//             console.log("Update data:", updateData);
//             const user = await User.findByIdAndUpdate(userId, updateData, { new: true },{returnDocument: 'after'});
//             if (!user) {
//                 return res.status(404).send("User not found");
//             } else {    
//                 console.log("User updated:", user);
//                 res.status(200).send(user);
//             }
//         }
        
//     } catch (error) {
//         res.status(500).send("Error updating user: " + error.message);
//     }
// });

// // Feed api - get /feed fet all users from the database
// app.get('/feed', async (req, res) => {
//     try {
//         const users = await User.find({});
//         if (users.length === 0) {
//             return res.status(404).send("No users found");
//         }
//         res.status(200).send(users);
//     }
//     catch (error) {
//         res.status(500).send("Error fetching users: " + error.message);
//     }
// })


