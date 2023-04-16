import products from "../models/productsModel.js"
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";
// getting products
export const getProducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage = 8
    const countProducts = await products.countDocuments()
    const apiFeature = new ApiFeatures(products.find(),req.query).search().filter().pagination(resultPerPage)
    
    const product =await apiFeature.query
    res.status(200).json({success:true,product,countProducts,resultPerPage})
})


// creating products
export const createProduct=catchAsyncErrors( async(req,res,next)=>{
    const product = await products.create(req.body);
    res.status(200).json({success:true,product})
}
)


// updating products
export const updateProduct =catchAsyncErrors( async (req,res,next)=>{
    let product = await products.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    product = await products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({success:true,product})
}
)

// deleting products

export const deleteProducts =catchAsyncErrors( async (req,res)=>{
    const product =await products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    await product.remove()
    res.status(200).json({success:true,message:'Product deleted'})
}
)

//getproduct details

export const getDetails =catchAsyncErrors( async (req,res,next)=>{
    const product =await products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
}
)

// create review or update review

export const createdProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating,productId,comment} = req.body;
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating:Number(rating),
        comment
    }
    const product =await products.findById(productId);

    const isReviewed =await products.reviews.find((rev)=>rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(product.user.toString()===req.user._id.toString())
            {
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg =0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    })/product.reviews.length
    await product.save({validationBeforeSave : false})
    res.status(200).json({
        success:true,
        
    })
})