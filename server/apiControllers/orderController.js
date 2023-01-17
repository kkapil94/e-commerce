import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import orderModel from "../models/orderModel.js";
import productsModel from "../models/productsModel.js";
import ErrorHandler from "../utils/errorhandler.js";

// create order
export const createNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    message: "product added",
    order,
  });
});

// get single order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("orders not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get all of a user orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.params.id });

  if (!orders) {
    return next(new ErrorHandler("orders not found ", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

//get all user order --admin
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find();
  let totalAmount = 0;
  if (!orders) {
    return next(new ErrorHandler("orders not found ", 404));
  }
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount
  });
});

//update order --admin

export const updateOrder = catchAsyncErrors(async (req,res,next)=>{
  const order = await orderModel.findById(req.params.id);

  if(!order){
    return(new ErrorHandler("order not found",400))
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("order is already delievered",400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product,order.quantity);
  })

  order.orderStatus = req.body.status

  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now()
  }
  await order.save({validateBeforeSave:false})
  res.status(200).json({
    success:true
  })
})

// update stock
async function updateStock(id,quantity){
  const product = productsModel.find(id);
  product.stock -=quantity;
  await product.save({validateBeforeSave:false});
}

// delet order --admin

export const deleteOrder = catchAsyncErrors(async (req,res)=>{
  const order =await orderModel.findById(req.params.id);
  if(!order){
    return(new ErrorHandler("order not found",400))
  }
  order.remove();
  res.status(200).json({
    success:true,
    order
  })
})
