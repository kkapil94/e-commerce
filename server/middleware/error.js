import ErrorHandler from "../utils/errorhandler.js";

export default (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    // mongodb id error

    if(err.name==="castError"){
        const message = `Resource not found invalid:${err.path}`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}