import mongoose from "mongoose";

// order schema

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    pincode: {
      required: true,
      type: Number,
    },
    phone: {
      required: true,
      type: Number,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "product",
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },
  paymentInfo:{
    id:{
        required:true,
        type:String
    },
    status:{
        required:true,
        type:String
    }
  },
  paidAt:{
    type:Date,
    required:true
  },
  itemsPrice:{
    type:Number,
    required:true
  },
  taxPrice:{
    type:Number,
    required:true
  },
  shippingPrice:{
    type:Number,
    required:true
  },
  totalPrice:{
    type:Number,
    required:true
  },
  orderStatus:{
    type:String,
    required:true,
    default:"processing"
  },
  delieveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

export default mongoose.model("Order",orderSchema);
