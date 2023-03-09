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

 //update user

 export const updateUser = catchAsyncErrors(async (req,res,next)=>{
    const newData = {
        name:req.body.name,
        email:req.body.email
    }
    if(req.body.avatar!==""){
        console.log(req.body);
        const user = await User.findById(req.body._id)
        console.log("i am user",user);
        const imageId =  user.avatar.public_id
        console.log("image",imageId)
        await cloudinary.v2.uploader.destroy(imageId)
        const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"Avatars",
            width:150,
            crop:"scale"
        })
        newData.avatar = {
            public_id:myCloud.public_id,
            url:myCloud.url
        }
    }
    const user =await User.findByIdAndUpdate(req.body._id,{
        name:newData.name,email:newData.email,avatar:newData.avatar
    },{new:true,runValidators:true,useFindAndModify:true})
    res.status(200).json({success:true,user})
 })

 // updatePassword

 export const updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const {pass,user} = req.body;
    const compare = bcrypt.compare(pass,user.password);
    if(compare){
        const hashedPass = bcrypt(pass,10)
    const response = User.findByIdAndUpdate(user._id,{password:hashedPass},{
        new:true,runValidators:true,useFindAndModify:true
    })
    res.status(200).json({success:true,user})
    }else return
 })