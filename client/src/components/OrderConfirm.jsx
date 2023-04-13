import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import cartStore from "../Stores/cartStore";
import { shippingStore } from "../Stores/shippingStore";
import userStore from "../Stores/userStore";
import Stepper from "./Stepper";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom"

function OrderConfirm() {
  const { address, city, phone, country, pincode, state } = shippingStore((state) => state.shippingInfo);
  const user = userStore((state) => state.user);
  const cart = cartStore((state) => state.cart);
  const navigate = useNavigate()
  let subTotal = 0;
  cart.forEach((i) => {
    subTotal = subTotal + i.product.price * i.quantity;
  });
  const gst = subTotal*0.18
  const shippingCharges = subTotal>=500?0:100
  const total = subTotal+gst+shippingCharges
  const payment =async  ()=>{
    navigate("/payment")
  }
  return (
    <>
      <Stepper activeStep={1}/>
      <Grid container>
        <Grid item lg={8} md={8} sm={8} xs={12} sx={{padding:{lg:"4rem",md:"4rem",sm:"4rem",xs:"1rem"},borderRight:"1px solid grey"}}>
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
              <Box id="itemContainer" sx={{marginTop:"2rem",paddingLeft:{lg:"1rem",md:"1rem",sm:"1rem",xs:"0"}}}>
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
        <Grid item lg="4" md="4" sm="4" xs="12" sx={{padding:{lg:"4rem",md:"3rem",sm:"1.5rem",xs:"2rem"}}}>
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
                  <Typography variant="subtitle2">₹{total}</Typography>
                </Stack>
            </Box>
          </Box>
          <Button variant="contained" sx={{width:"100%",marginTop:".5rem"}} onClick={payment}>Proceed To Payment</Button>
        </Grid>
      </Grid>
      
    </>
  );
}

export default OrderConfirm;
