const express= require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true

}))

// imports 
const connectDB=require("./Connections/connectDB.js");
connectDB;
//port
const port = process.env.port|| 8000;
// middleWare
app.use(express.json());
app.use(cookieParser());
// Routes;
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })

const AuthRoutes = require("./Routes/UserRoute.js");
const VideoRoutes = require("./Routes/VideoRoute.js");
const CommentRoutes = require("./Routes/CommentRoute.js");
app.use("/auth",AuthRoutes);
app.use("/api",VideoRoutes);
app.use("/commentApi",CommentRoutes);

//app listen
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})