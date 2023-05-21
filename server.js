const express = require("express");
const {userRouter} = require("./routes/users.routes");
const {logger} = require("./middleware/logger.middleware")

const app = express();
app.use(express.json());

// logs.txt file created using logger middleware 
app.use(logger);



// for default route or Route a
app.get("/",(req,res) =>{
    res.send("Welcome to the Homepage");
})

// for user route or Route (b and c)
app.use("/api",userRouter);

// Handling middleware for Invalid Error Message
app.use((req,res,next) => {
    res.status(404).json({ error: "Invalid route"});
})

// Handling middleware for  Internal server Error Message
app.use((err,req,res,next) => {
    res.status(500).json({ error: "Internal Server Error"});
})


// running server at port number 3000
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running at port Number ${port}`);
})