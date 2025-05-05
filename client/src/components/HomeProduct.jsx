import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton,
  Chip,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Stores/productStore";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function HomeProducts() {
  const products = useProducts((state) => state.products.product);
  const loading = useProducts((state) => state.loading);
  const fetch = useProducts((state) => state.fetchProducts);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Function to create product skeleton loaders
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={`skeleton-${index}`}>
          <Box sx={{ padding: 1 }}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ borderRadius: 2, mb: 1 }}
            />
            <Skeleton variant="text" height={30} width="70%" />
            <Skeleton variant="text" height={20} width="40%" />
            <Skeleton variant="text" height={24} width="30%" />
          </Box>
        </Grid>
      ));
  };

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Chip
            icon={<AutoAwesomeIcon />}
            label="TOP PICKS"
            color="primary"
            sx={{ mb: 2, fontWeight: 500 }}
          />

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "3px",
                backgroundColor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            Featured Products
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              mt: 3,
              mb: 2,
            }}
          >
            Explore our selection of top-rated products, carefully selected for
            exceptional quality and value
          </Typography>
        </Box>

        {loading ? (
          <Grid container spacing={2}>
            {renderSkeletons()}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            className="fade-in"
          >
            {products &&
              products.slice(0, 8).map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product._id}>
                  <Link
                    to={`product/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductCard products={product} />
                  </Link>
                </Grid>
              ))}
          </Grid>
        )}

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Chip
              label="View All Products"
              color="primary"
              variant="outlined"
              clickable
              sx={{
                fontSize: "1rem",
                py: 2.5,
                px: 3,
                borderRadius: "50px",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
}
