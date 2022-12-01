require("dotenv").config()     //configuring the .env file before oading other things, so writing it in first line
const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");



//middlewares
app.use(express.json())  //To handle parse or the json data coming in request 
app.use(express.urlencoded({ extended: true }))  //To handle data coming from URL in encoded format
app.use(cookieParser());
app.use("/api", todoRoute);
app.use("/user", userRoute)
app.use("/task", taskRoute)



module.exports = app;