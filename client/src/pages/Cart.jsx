import React, { useState } from "react";
import { Button, Container, Grid, IconButton, Input, Stack, Typography } from "@mui/material";
import cartStore from "../Stores/cartStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Cart() {
  const cartItems = cartStore((state) => state.cart);
  const [quan,setQuan] = useState(1)
//   const incQuan = ()=>{
//     if(productDetails.product.stock>quan){
//       setQuan(quan+1)
//     }
//     else{return quan}
//   }
//   const decQuan = ()=>{
//     if(quan>1){
//       setQuan(quan-1)
//     }
//     else{return quan}
//   }
  return (
    <>
      <Container maxWidth="lg" sx={{ height: "80vh", width: "100vw" }}>
        <Grid container>
          <Grid item lg={8} md={8} sm={12}>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              className="title"
              style={{
                borderBottom: "2px solid gray",
                paddingBottom: ".5rem",
                margin: "2rem 0",
              }}
            >
              <Typography variant="h3">Shopping Cart</Typography>
              <Typography variant="h6">Quantity</Typography>
            </Stack>
            <Stack justifyContent="space-around" spacing={3}>
              {cartItems.map((item) => (
                <Stack direction={"row"} sx={{ height: "10rem" }}>
                  <img
                    src={item.product.images[0].url}
                    style={{
                      height: "100%",
                      width: "8rem",
                      border: "2px solid grey",
                    }}
                  />
                  <div className="itemContent" style={{ paddingLeft: "2rem" }}>
                    <div>
                      <Typography variant="h5">{item.product.name}</Typography>
                      <Typography variant="subtitle1" sx={{ margin: "1rem 0" }}>
                        ₹{item.product.price}
                      </Typography>
                      <Button variant="outlined" size="small">
                        Remove
                      </Button>
                    </div>
                    <div className="quantity">
                      <IconButton size="small" onClick={''}>
                        <RemoveIcon />
                      </IconButton>
                      <Input
                        type="number"
                        size="sm"
                        value={quan}
                        slotProps={{
                          input: {
                            min: 1,
                            max: item.product.stock,
                          },
                        }}
                      />
                      <IconButton size="small" onClick={'incQuan'}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item lg={4} md={4} sm={12}></Grid>
        </Grid>
      </Container>
    </>
  );
}
