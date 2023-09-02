import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import cartStore from "../Stores/cartStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import {useNavigate} from "react-router-dom"
export default function Cart() {
  const cartItems = cartStore((state) => state.cart);
  const remove = cartStore((state) => state.removeItem);
  let total = 0;
  cartItems.forEach((i) => {
    total = total + i.product.price * i.quantity;
  });
  // eslint-disable-next-line
  const [quan, setQuan] = useState(0);
  const setQuantity = cartStore((state) => state.setQuan);
  const navigate = useNavigate()
  const incQuan = (prod, quantity) => {
    if (prod.stock > quantity) {
      setQuantity(prod, quantity + 1);
      setQuan(quantity + 1);
    } else {
      return setQuantity(quantity);
    }
  };
  const decQuan = (prod, quantity) => {
    if (quantity > 1) {
      setQuantity(prod, quantity - 1);
      setQuan(quantity - 1);
    } else {
      return setQuantity(quantity);
    }
  };
  const checkOut = ()=>{
    navigate("/login?redirect=shipping")
  }
  return !cartItems.length ? (
    <>
      <div style={{ display: "flex", alignItems: "center",flexDirection:"column"}}>
        <Box sx={{height:{lg:"26rem",md:"24rem",sm:"25rem",xs:"18rem"},width:{lg:"38rem",md:"35rem",sm:"30rem",xs:"20rem"},marginTop:"2rem"}}>
        <img src="./images/preview.png" alt="" style={{height:"100%",width:"100%",marginBottom:"2rem"}}/> 
        </Box>
        <Typography variant="h4" letterSpacing={1}> Your cart is empty</Typography>
      </div>
    </>
  ) : (
    <>
      <Box
        sx={{
          background: "#EAEDED",
          width: "98.5vw",
          position: "relative",
          overflow: "hidden",
          marginTop:{lg:"0",md:"0",sm:"0",xs:"2.6rem"}
        }}
      >
        <Grid container>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
            sx={{
              padding: "1rem",
              width: "60%",
              margin: {lg:"2rem",md:"2rem",sm:"1.5rem",xs:"1rem"},
              background: "#fff",
              border: "1px solid gray",
            }}
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              className="title"
              sx={{
                borderBottom: "1px solid gray",
                paddingBottom: ".5rem",
              }}
            >
              <Typography sx={{typography:{lg:"h3",md:"h3",sm:"h3",xs:"h5"}}}>Shopping Cart</Typography>
              <Typography variant="h6" sx={{ paddingTop: "3rem",display:{lg:"initial",md:"initial",sm:"initial",xs:"none"} }}>
                Price
              </Typography>
            </Stack>
            <Stack
              justifyContent="space-around"
              spacing={3}
              sx={{ marginTop: "2rem" }}
            >
              {cartItems.map((item) => (
                <Stack
                  direction={"row"}
                  sx={{ height: "10rem" }}
                  key={item.product._id}
                >
                  <img
                    src={item.product.images[0].url}
                    style={{
                      height: "100%",
                      width: "8rem",
                      border: "1px solid grey",
                      objectFit:"contain"
                    }}
                    alt=""
                  />
                  <div
                    className="itemContent"
                    style={{
                      paddingLeft: "1.5rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <Typography variant="h5">{item.product.name}</Typography>
                      <Typography variant="subtitle2" sx={{display:{lg:"none",md:"none",sm:"none",xs:"inline"}}}>₹{item.quantity * item.product.price}</Typography>
                      <Stack direction={'row'} sx={{ margin: {lg:"1.9rem 0",md:"1.9rem 0",sm:"1.9rem 0",xs:"1rem 0"} }}>
                        <IconButton
                          size="small"
                          sx={{
                            border: "2px solid gray",
                            borderRadius: ".4rem",
                            height: "1.7rem",
                            width:"1.8rem"
                          }}
                          onClick={() => decQuan(item.product, item.quantity)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Input
                          
                          sx={{
                            border: "2px solid gray",
                            borderRadius: ".4rem",
                            width:"2.4rem",
                            height:"1.8rem",
                            paddingTop:'.3rem'
                          }}
                          type="number"
                          size="small"
                          value={item.quantity}
                          slotProps={{
                            input: {
                              min: 1,
                              max: item.product.stock,
                            },
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            border: "2px solid gray",
                            borderRadius: ".4rem",
                            height: "1.7rem",
                            width:"1.8rem"
                          }}
                          onClick={() => incQuan(item.product, item.quantity)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Stack>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          remove(item.product);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="price">
                      <Typography variant="subtitle1" sx={{display:{lg:"initial",md:"initial",sm:"initial",xs:"none"}}}>
                        ₹{item.quantity * item.product.price}
                      </Typography>
                    </div>
                  </div>
                </Stack>
              ))}
            </Stack>
            <Box
              sx={{
                borderTop: "2px solid grey",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                margin: "2rem 0 0 0",
              }}
            >
              <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Subtotal: ₹{total}</Typography>
            </Box>
          </Grid>
          <Grid item lg={3.2} md={3.2} sm={12} xs={12} sx={{ marginTop: "2rem" }}>
            <Box
              sx={{
                width: {lg:"95%",md:"95%",sm:"95%",xs:"94%"},
                height: "10rem",
                border: "2px solid gray",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
                margin:{lg:"0",md:"0",sm:"1rem",xs:"1rem"}

              }}
            >
              <Typography variant="h5">Subtotal: ₹{total}</Typography>
              <Button
                variant="outlined"
                sx={{ width: "80%", marginTop: "2rem" }}
                onClick={checkOut}
              >
                Proceed To Check Out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
