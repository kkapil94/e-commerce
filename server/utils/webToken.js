import jwt from "jsonwebtoken"

export const Token = (user,statusCode,res)=>{
    const token = jwt.sign({id:user._id},"SecretKey")
    //option for cookie
    const options = {
        expires:new Date(
            Date.now() + 5*24*60*60*1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        user
    })
}
