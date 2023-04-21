import jwt from "jsonwebtoken"

export const Token = (user,statusCode,res)=>{
    const token = jwt.sign({id:user._id},"SecretKey")
    //option for cookie
    const options = {
        maxAge: 86400000,
        httpOnly:true,
        sameSite:"None",
        secure:true,
         path: '/',
         domain: 'https://e-commerce-kkapil94.vercel.app'
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        user
    })
}
