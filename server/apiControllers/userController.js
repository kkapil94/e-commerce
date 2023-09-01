import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import crypto from "crypto"
import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";
import { Token } from "../utils/webToken.js";
import cloudinary from "cloudinary"
import sendMail from "../utils/sendMail.js"
// register user
export const registerUser = catchAsyncErrors(async (req,res,next)=>{
    const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"Avatars",
        width:300,
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
        const user = await User.findById(req.body._id)
        const imageId =  user.avatar.public_id
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
    const compare =await bcrypt.compare(pass.oldOne,user.password);
    if(!compare){
        return next(new ErrorHandler("Incorrect Old Password",404)) 
    }
    if(compare){
        const hashedPass =await bcrypt.hash(pass.newOne,10)
    const resp =await User.findByIdAndUpdate(user._id,{password:hashedPass},{new:true,runValidators:true,useFindAndModify:true})
    res.status(200).json({success:true,resp})
    }
 })

 // Forgot Password

 const genTok = ()=>{
    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and save reset token
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');

    const resetPasswordExpire = Date.now() + 15 * 60 * 1000
    
    return {resetToken,resetPasswordToken,resetPasswordExpire} 
 }

export const forgotPass = catchAsyncErrors(async (req,res,next)=>{
    const {mail} = req.body;
    const user =await User.findOne({email:mail});
    if(!user){
         return next(new ErrorHandler("please enter valid email",400));
    }
    const token = genTok();
    user.resetPasswordToken = token.resetPasswordToken;
    user.resetPasswordExpire = token.resetPasswordExpire;
    await user.save({validateBeforUse:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${token.resetToken}`
    const message = `Your password reset token is :-- \n\n${resetPasswordUrl}\n\n . If you does not have requested it, then ignore it ` 
    try {
        await sendMail({
            email:user.email,
            subject:"KK mart reset password token",
            message
        })
        res.status(200).json({
            success:true,
            message:`email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }

})

//reset password

export const resetPass = catchAsyncErrors(async (req,res,next)=>{
    const token = crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("the reset token is expired or invalid",400))
    }
    const hashedPass =await bcrypt.hash(req.body.newOne,10)
    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();
    Token(user,200,res)
})