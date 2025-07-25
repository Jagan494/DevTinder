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