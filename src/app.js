const express = require('express');
const app = express();

// app.use("/hello", (req, res)=>{
//     res.send("Hello, World!");
// },)

// app.use("/", (req, res)=>{
//     res.send("default route");
// })



app.get('/hello', (req, res) => {
    res.send('Hello, World! (GET )');
});

app.post('/hello', (req, res) => {
    res.send('Hello, World! (POST)');
});

// Middleware to log request method and URL

app.get('/', (req, res, next) => {
    next()
}, (req,res)=> {
    res.send('Hello, World! (DEFAULT)');
    // console.log("Request received at root route")
});
 


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});