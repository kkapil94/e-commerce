import { Container, Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../store";
import ProductCard from "./ProductCard";

export default function Products() {
  const params = useParams()
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const fetchProducts = useProducts((state) => state.fetchProducts);
  const products = useProducts((state) => state.products.product);
  const details = useProducts(state=>state.products)
  const keyword =params.keyword
  useEffect(() => {
    fetchProducts(keyword,page);
  }, [fetchProducts,keyword,page]);

  return (
    <>
      <Fragment>
        <Container sx={{ marginTop: "5rem" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "#424040",
              borderBottom: "2px solid #b1aeae",
              width: "25rem",
              paddingBottom: "1rem",
              textAlign: "center",
              margin: "0 auto 4rem auto",
            }}
          >
            Products
          </Typography>
          <Stack
            direction={"row"}
            flexWrap="wrap"
            alignItems={"center"}
            justifyContent="center"
          >
            {products &&
              products.map((product) => (
                <Link
                  to={`product/${product._id}`}
                  style={{ textDecoration: "none" }}
                  key={product._id}
                >
                  <ProductCard products={product} />
                </Link>
              ))}
          </Stack>
          { products && <Pagination count={details&&Math.ceil(details.countProducts/details.resultPerPage)} page={page} onChange={handleChange} variant="outlined" size="large" sx={{display:"flex",marginTop:"5rem",justifyContent:"center"}} />}
        </Container>
      </Fragment>
    </>
  );
}
