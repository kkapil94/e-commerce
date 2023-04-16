import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
async function connect(){
    const password = process.env.MONGO_PASSWORD
    const username = process.env.MY_USERNAME
    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.4ggetop.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{console.log("mongodb connection is successfull")})
.catch((err)=>{console.log(err)})
}

export default connect