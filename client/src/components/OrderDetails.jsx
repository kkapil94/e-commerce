import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import userStore from "../Stores/userStore";

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const user = userStore(state=>state.user)
  const { id } = useParams();
  const OrderDet = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`);
    setOrder(data.order)

  };
  useEffect(()=>{
    OrderDet()
  },[])
  return (
    <>
      {order && (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            background:"#f1f3f6",
            overflow:"hidden",
          }}
        >
          <Box sx={{ width: "90vw",marginBottom:"5rem"}}>
              <Box sx={{ marginBottom: "2rem" ,background:"#fff",padding:"2rem",marginTop:"2rem",overflow:"hidden"}}>
                <Typography variant="h6">Delivery Address</Typography>
                <Box sx={{ paddingLeft: "1rem", marginTop: "1rem" }}>
                  <Typography variant="subtitle2" color={"gray"}>
                    <b>Name</b>: {user.name}
                  </Typography>
                  <Typography variant="subtitle2" color={"gray"}>
                    <b>Phone</b>: {order.shippingInfo.phone}
                  </Typography>
                  <Typography variant="subtitle2" color={"gray"}>
                    <b>Address</b>:{" "}
                    {order.shippingInfo.address +"," +order.shippingInfo.city +"," +order.shippingInfo.state +"," +order.shippingInfo.pincode +"," +order.shippingInfo.country}
                  </Typography> 
                </Box>
               </Box>
               <Box>
                <Box id="itemContainer" sx={{marginTop:"2rem",paddingLeft:"1rem",background:"#fff",padding:"2rem"}}>
                
                    <Typography variant="h6">Order Items:</Typography>
                {order.orderItems.map(item => (
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:"5rem",margin:"2rem 0"}} >
                  <div style={{display:"flex",alignItems:"center"}}>
                  <img  alt='' src={item.image} style={{width:"5.5rem",border:"1px solid grey",marginRight:"1rem"}}/>
                  <Typography variant="subtitle1" >{item.name}<br/><Typography variant="subtitle2">Quantity:{item.quantity}</Typography><Typography variant="subtitle2" >₹{item.price}</Typography></Typography> 
                  </div> 
                  <Typography variant="subtitle1">Payment:{order.paymentInfo.status}</Typography>
                  <Typography variant="subtitle1">status:{order.orderStatus}</Typography>
                </Box>
                    ))}
               </Box>
                 </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
