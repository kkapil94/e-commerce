import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
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
export default function Cart() {
  const cartItems = cartStore((state) => state.cart);
  const [price, setPrice] = useState(0);

  const setQuantity = cartStore((state) => state.setQuan);
  const [quan, setQuan] = useState(null);

  const incQuan = async (prod, quantity) => {
    if (prod.stock > quantity) {
      setQuantity(prod, quantity + 1);
    } else {
      return setQuantity(quantity);
    }
  };
  const decQuan = (prod, quantity) => {
    if (quantity > 1) {
      setQuantity(prod, quantity - 1);
    } else {
      return setQuantity(quantity);
    }
  };
  useEffect(() => {
    let total = 0;
    cartItems.forEach(
      (item) => (total = total + item.product.price * item.quantity)
    );
    setPrice(total);
  }, [cartItems]);
  return (
    <>
      <Box  sx={{ background:"#EAEDED", width: "98.5vw", position:"relative",overflow:"hidden"}}>
        <Grid container>
          <Grid item lg={8} md={8} sm={12} sx={{padding:'1rem',width:"60%",margin:"2rem",background:"#fff",border:"2px solid gray"}}>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              className="title"
              style={{
                borderBottom: "2px solid gray",
                paddingBottom: ".5rem"
              }}
            >
              <Typography variant="h3">Shopping Cart</Typography>
              <Typography variant="h6" sx={{ paddingTop: "3rem" }}>
                Price
              </Typography>
            </Stack>
            <Stack justifyContent="space-around" spacing={3} sx={{marginTop:'2rem'}}>
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
                      border: "2px solid grey",
                    }}
                  />
                  <div
                    className="itemContent"
                    style={{
                      paddingLeft: "2rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <Typography variant="h5">{item.product.name}</Typography>
                      <div style={{ margin: "1.9rem 0" }}>
                        <IconButton
                          size="small"
                          sx={{
                            border: "2px solid gray",
                            borderRadius: ".4rem",
                            height: "2.2rem",
                          }}
                          onClick={() => decQuan(item.product, item.quantity)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Input
                          sx={{
                            border: "2px solid gray",
                            borderRadius: ".4rem",
                          }}
                          type="number"
                          size="sm"
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
                            height: "2.2rem",
                          }}
                          onClick={() => incQuan(item.product, item.quantity)}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <Button variant="outlined" size="small">
                        Remove
                      </Button>
                    </div>
                    <div className="price">
                      <Typography variant="subtitle1">
                        ₹{(quan ? quan : item.quantity) * item.product.price}
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
              <Typography variant="h6">Subtotal: ₹{price}</Typography>
            </Box>
          </Grid>
          <Grid item lg={3.2} md={3.2} sm={12}   sx={{ marginTop:'2rem' }} >
          <Box
            sx={{ width: "100%", height: "10rem", border: "2px solid gray",padding:"1rem",display:"flex",flexDirection:"column",alignItems:"center" ,background:"#fff"}}
          >
            <Typography variant="h5">Subtotal: ₹{price}</Typography>
            <Button variant="outlined" sx={{width:"80%",marginTop:"2rem"}}>Proceed To Check Out</Button>
          </Box>
          </Grid>
          
        </Grid>
      </Box>
    </>
  );
}