import express from 'express'
import product from './Routes/productRoute.js'
import order from "./Routes/orderRoute.js"
import connect from './database/mongodb.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.js'
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'


import user from './Routes/userRoute.js'
import cors from "cors"
import fileUpload from 'express-fileupload'
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
//uncaught error

process.on("uncaughtException",(err)=>{
    console.log(`err:${err.message}`);
    console.log("shutting down the server due to unhandled rejection");
    process.exit(1)
})
dotenv.config()

mongoose.set("strictQuery", false);
 connect()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use("/api/v1",order)
app.use(errorMiddleware)
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})
const server = app.listen('4000',()=>{
    console.log('app is listening on port:4000');
})

//unhandled rejection


process.on("unhandledRejection",(err)=>{
    console.log(`err:${err.message}`);
    console.log("shutting down the server due to unhandled rejection");
    server.close(()=>{
        process.exit(1)
    });

})