import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"

import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import postRoute from "./Routes/postRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
//routes
const app=express();

app.use(express.static('public')) //serve files
app.use('/images',express.static("images")) //the root directory from which to serve static assets.
//Middlewares
app.use(bodyParser.json({limit:"30mb",extended:true})); //max request of body size  //parse the incoming requests in middleware before we handle
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));  //only parses urlencoded bodies
app.use(cors())   // restricts cross-origin HTTP requests
dotenv.config()
mongoose
    .connect(
        process.env.MONGO_DB,{useNewUrlParser: true,
        useUnifiedTopology: true}
    )
    .then(() => 
        app.listen(process.env.PORT,() => 
            console.log(`Listening port at ${process.env.PORT}`)
        )
    )
    .catch((error)=>console.log(error));


app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',postRoute)
app.use('/upload',UploadRoute)
