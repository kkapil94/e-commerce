import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";
import { Token } from "../utils/webToken.js";
import cloudinary from "cloudinary"
// register user
export const registerUser = catchAsyncErrors(async (req,res,next)=>{
    const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"Avatars",
        width:150,
        crop:"scale"
    })
    const {name,email,password,role} = req.body
    const hashedPass =await bcrypt.hash(password,10)
    const user =await User.create({
        name,email,password:hashedPass,role,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
    Token(user,200,res)
})


// login user

 export const loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter the email and password",404))
    }
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Please enter valid email and password",400))
    }
    const matchedPassword =await bcrypt.compare(password,user.password)
    if(!matchedPassword){
        return next(new ErrorHandler("invalid email amd password",404)) 
    }
    Token(user,200,res)

})

// logout user

 export const logoutUser = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        sucsess:true,
        message:"Logged out"
    })
 })