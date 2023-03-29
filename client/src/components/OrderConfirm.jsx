import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import cartStore from "../Stores/cartStore";
import { shippingStore } from "../Stores/shippingStore";
import userStore from "../Stores/userStore";
import Stepper from "./Stepper";
import CloseIcon from '@mui/icons-material/Close';

function OrderConfirm() {
  const { address, city, phone, country, pincode, state } = shippingStore((state) => state.shippingInfo);
  const user = userStore((state) => state.user);
  const cart = cartStore((state) => state.cart);
  let subTotal = 0;
  cart.forEach((i) => {
    subTotal = subTotal + i.product.price * i.quantity;
  });
  const gst = subTotal*0.18
  const shippingCharges = subTotal>=500?0:100
  return (
    <>
      <Stepper activeStep={1}/>
      <Grid container>
        <Grid item lg={8} md={8} sm={8} sx={{padding:"4rem"}}>
          <Stack >
            <Box sx={{marginBottom:"2rem"}}>
              <Typography variant="h6">Shipping Info</Typography>
              <Box sx={{paddingLeft:"1rem",marginTop:"1rem"}}>
                <Typography variant="subtitle2" color={"gray"}>
                  <b>Name</b>:   {user.name}
                </Typography>
                <Typography variant="subtitle2" color={"gray"}>
                  <b>Phone</b>:   {phone}
                </Typography>
                <Typography variant="subtitle2" color={"gray"}>
                  <b>Address</b>:  {address+","+city+","+state+","+pincode+","+country}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">Cart Items:</Typography>
              <Box id="itemContainer" sx={{marginTop:"2rem",paddingLeft:"1rem"}}>
                {
                cart.map(item=>(
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:"5rem"}}>
                  <div style={{display:"flex",alignItems:"center"}}>
                  <img  alt='' src={item.product.images[0].url} style={{width:"5.1rem",border:"1px solid grey"}}/>
                  <Typography variant="subtitle1" >{item.product.name}</Typography>
                  </div>
                  <Typography variant="subtitle1" >{item.quantity}<CloseIcon fontSize="small" sx={{paddingTop:".4rem"}}/>{item.product.price}=₹{item.quantity*item.product.price}</Typography>
                </Box>
                ))
                }
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item lg="4" md="4" sm="4" sx={{padding:"4rem"}}>
          <Box >
            <Typography variant="h6" textAlign={"center"} sx={{paddingBottom:".5rem",borderBottom:"1px solid grey"}}>Order Summary</Typography>
            <Box sx={{marginTop:"2rem"}}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" sx={{marginBottom:"1rem"}}>
                  <Typography variant="subtitle2">SubTotal:</Typography>
                  <Typography variant="subtitle2">₹{subTotal}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" sx={{marginBottom:"1rem"}}>
                  <Typography variant="subtitle2">Shipping Charges:</Typography>
                  <Typography variant="subtitle2">₹{shippingCharges}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" sx={{marginBottom:"1rem",paddingBottom:"2rem",borderBottom:"1px solid gray"}}>
                  <Typography variant="subtitle2">GST:</Typography>
                  <Typography variant="subtitle2">₹{gst}</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" sx={{marginBottom:"1rem"}}>
                  <Typography variant="subtitle2">Total:</Typography>
                  <Typography variant="subtitle2">₹{subTotal+gst+shippingCharges}</Typography>
                </Stack>
            </Box>
          </Box>
          <Button variant="contained" sx={{width:"100%",marginTop:".5rem"}}>Proceed To Payment</Button>
        </Grid>
      </Grid>
      
    </>
  );
}

export default OrderConfirm;
