import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Stores/productStore";
import ProductCard from "./ProductCard";
import Loader from "./Loader"

export default function HomeProducts() {
  
  const products = useProducts((state) => state.products.product);
  const loading = useProducts((state) => state.loading);
  const fetch = useProducts((state) => state.fetchProducts);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Fragment>
      {
        loading?<Loader/>:
      
      <Box  sx={{maxWidth:"100vw",padding:"3rem"}}>
        <Typography
          align="center"
          sx={{
            typography:{lg:"h4",xs:"h5"},
            color: "#424040",
            borderBottom: "2px solid #b1aeae",
            width: {lg:"25rem",md:"20rem",sm:"20rem",xs:"16rem"},
            paddingBottom: ".8rem",
            textAlign: "center",
            margin: "0 auto 2rem auto",
          }}
        >
          Featured Products
        </Typography>
        <Stack
          direction={"row"}
          flexWrap="wrap"
          alignItems={"center"}
          justifyContent="center"
          spacing={2}
          // sx={{width:"80vw"}}
        >
          {products &&
            products.map((product) => (
              <Link
                to={`product/${product._id}`}
                style={{ textDecoration: "none" }}
                key={product._id}
              >
                <ProductCard products={product}/>
              </Link>
            ))}
        </Stack>
      </Box>
}
    </Fragment>
  );
}