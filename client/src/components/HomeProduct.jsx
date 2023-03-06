import {
  Container,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../store";
import ProductCard from "./ProductCard";

export default function HomeProducts() {
  const products = useProducts((state) => state.products.product);
  const loading = useProducts((state) => state.loading);
  console.log(products, loading);
  const fetch = useProducts((state) => state.fetchProducts);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Fragment>
      <Container sx={{width:"85%",marginTop: "5rem" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#424040",
            borderBottom: "2px solid #b1aeae",
            width: "25rem",
            paddingBottom: "1rem",
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
        >
          {!loading &&
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
      </Container>
    </Fragment>
  );
}