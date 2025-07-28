// app.use("/hello", (req, res)=>{
//     res.send("Hello, World!");
// },)

// app.use("/", (req, res)=>{
//     res.send("default route");
// })

// app.use('/', (req, res, next) => {
//     // Middleware to log request method and URL
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next()
// });

// app.all('/', (req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next()
// });
    // console.log("Request received at root route")

// app.get('/user/:userId/age/:age', (req, res) => {
//     const userId = req.params.userId;
//     const age = req.params.age; 
//     res.send(`User: ${userId}, Age: ${age}`);
// });

// app.post('/', (req, res) => {
//     res.send('Hello, World! (POST)');
// });

// Middleware to log request method and URL

// app.get('/', (req, res, next) => {
//     // Middleware to log request method and URL
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next()
// }, (req,res)=> {
//     res.send('Hello, World! (DEFAULT)');
//     // console.log("Request received at root route")
// });



app.use("/admin", authAdmin);
app.get("/user", authUser, (req, res, next) => {
    res.send("User authenticated");
    next();
});

app.post("/user/login", (req, res) => {
    res.send("User login successful");
});


app.get('/admin/getUser', (req, res, next) => {
    res.send('Admin User');
});

app.post('/admin/deleteUser', (req, res, next) => {
    res.send('Admin Delete User');
});


// Middleware to log request method and URL
const { authAdmin, authUser } = require('./middlewares/auth');  

app.get('/getUserData', (req, res) => {
    throw new Error('This is a test error'); // Simulating an error
    res.send("Hello, World!");
});

app.use("/", (err,req,res,next) => {
    if (err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
})
