import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter te product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter the description"]
    },
    price:{
        type:Number,
        required:[true,"plese enter the price of products"],
        maxLength:8
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:1
        },
        url:{
            type:String,
            required:1
        }
    }],
    category:{
        type:String,
        required:[true,'Please enter the category of products']
    },
    stock:{
        type:Number,
        required:[true,"plese enter the stock"],
        maxLength:[4,"Length cannot exceed the 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    review:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user',
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    created_At:{
        type:Date,
        default:Date.now()
    }
})
export default new mongoose.model("Product",productSchema)