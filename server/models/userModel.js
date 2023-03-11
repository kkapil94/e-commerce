import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name"],
        maxLength:[30,"Name should not exceed 30 characters"],
        minLength:[4,"Name should be greater than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter the email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[8,"password must be greater than 8 character"],
        select:false
    },
    avatar:{ public_id:{
        type:String,
        required:1
    },
    url:{
        type:String,
        required:1
    }},
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

export default new mongoose.model("User",userSchema)