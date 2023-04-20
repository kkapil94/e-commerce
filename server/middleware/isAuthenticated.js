import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
export const isAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("please login to access this resources",401))
    }
    const decodedData = jwt.verify(token,"SecretKey")
    req.user = await User.findById(decodedData.id)
    next()
})

// authorise roles

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access the resource`,403));
        }
        next()
    }
}

