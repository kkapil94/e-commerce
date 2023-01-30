import express from 'express'
import product from './Routes/productRoute.js'
import order from "./Routes/orderRoute.js"
import connect from './database/mongodb.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.js'
import user from './Routes/userRoute.js'
import cors from "cors"
const app = express()
app.use(cors())
//uncaught error

process.on("uncaughtException",(err)=>{
    console.log(`err:${err.message}`);
    console.log("shutting down the server due to unhandled rejection");
    process.exit(1)
})


mongoose.set("strictQuery", false);
 connect()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use("/api/v1",order)
app.use(errorMiddleware)
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