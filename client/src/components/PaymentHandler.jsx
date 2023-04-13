import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import {useSearchParams} from "react-router-dom"
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import cartStore from "../Stores/cartStore";
import Stepper from "./Stepper"
import orderStore from "../Stores/orderStore";
import { shippingStore } from "../Stores/shippingStore";
import Loader from "./Loader";

export default function PaymentHandler() {
  const shippingInfo = shippingStore(state=>state.shippingInfo)
  const cart = cartStore((state) => state.cart);
  console.log(cart);
  const createOrder = orderStore((state) => state.createOrder);
  const param = useSearchParams()[0]
  const ref = param.get("reference")
  console.log(ref);
  let subTotal = 0;
  cart.forEach((i) => {
    subTotal = subTotal + i.product.price * i.quantity;
  });
  const gst = subTotal * 0.18;
  const shippingCharges = subTotal >= 500 ? 0 : 100;
  const total = subTotal + gst + shippingCharges;

  let orderDetails = {
    shippingInfo,
    orderItems:cart.map(item=>({
      name:item.product.name,
      quantity:item.quantity,
      price:item.product.price,
      image:item.product.images[0].url,
      product:item.product._id
    })),
    itemsPrice:subTotal,
    taxPrice:gst,
    shippingPrice:shippingCharges,
    totalPrice:total}

  const payment = async () => {
    const {data: { order }, } = await axios.post("http://localhost:4000/api/v1/checkout", { total });
    var options = {
      key: "rzp_test_NImFwytULPh8lH",
      amount: order.amount,
      currency: "INR",
      name: "Kapil Khatri",
      description: "For eCommerce",
      image: "./images/logo1234.jpg",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/v1/paymentVerification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  const newOrder = async()=>{
    orderDetails = {...orderDetails,paymentInfo:{id:ref,status:"success"}}
    console.log(orderDetails);
    const order =await createOrder(orderDetails)
    console.log("iam",order);
  }
  useEffect(() => {
    if(!ref)
    payment()
    else {newOrder();}
  }, [ref]);
  return (
    <>
      
    {!ref?<>
        <Stepper activeStep={2} sx={{overflow:"hidden"}}/>
        <Loader/>
       </>:<Box sx={{ display: "flex",height:"80vh",width:"100vw",alignItems:'center',justifyContent:"center",overflow:"hidden"}}>
        <Box sx={{border:"1px solid grey",width:{lg:"20rem",md:"20rem",sm:"20rem",xs:"18rem"},height:"20rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:'.5rem'}}>
          <OfflinePinIcon fontSize="large" sx={{fontSize:{lg:"15rem",md:"15rem",sm:"15rem",xs:"12rem"},color:"#1976d2"}}/>
          <Typography variant="h6">Payment successfull</Typography>
          <Typography variant="subtitle2">reference no.: <b>{ref}</b></Typography>
        </Box>
      </Box>
    }
    </>
  );
}
