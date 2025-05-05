import {
  Box,
  Button,
  Grid,
  Rating,
  Typography,
  IconButton,
  Stack,
  Container,
  Chip,
  Divider,
  Paper,
  TextField,
  Snackbar,
  Alert,
  Breadcrumbs,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Fragment, useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import useProducts from "../Stores/productStore";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Review from "../components/Review";
import "./ProductDetails.css";
import cartStore from "../Stores/cartStore";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";

export default function ProductDetails() {
  const alert = useAlert();
  const { id } = useParams();
  const [quan, setQuan] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const productDetails = useProducts((state) => state.productDetails);
  const fetchProductDetails = useProducts((state) => state.fetchProductDetails);
  const addItem = cartStore((state) => state.addToCart);
  const loading = useProducts((state) => state.loading);

  // Slider settings with reference for direct control
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (current) => setCurrentSlide(current),
    customPaging: (i) => (
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: currentSlide === i ? "primary.main" : "#ccc",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  const incQuan = () => {
    if (productDetails.product.stock > quan) {
      setQuan(quan + 1);
    }
  };

  const decQuan = () => {
    if (quan > 1) {
      setQuan(quan - 1);
    }
  };

  const addToCart = (product) => {
    addItem(product, quan);
    alert.success("Added to cart successfully");
  };

  useEffect(() => {
    fetchProductDetails(id);
    // Reset quantity on product change
    setQuan(1);
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, fetchProductDetails]);

  if (loading || !productDetails) return <Loader />;

  const { product } = productDetails;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </Link>
        <Link
          to="/products"
          style={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            textDecoration: "none",
          }}
        >
          <StoreIcon sx={{ mr: 0.5 }} fontSize="small" />
          Products
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "0.875rem" }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      {/* Product Details */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container>
          {/* Product Images */}
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                background: "#f8f9fa",
                borderRadius: { xs: 0, md: "16px 0 0 16px" },
                height: { xs: "300px", sm: "400px", md: "500px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Slider
                ref={sliderRef}
                {...settings}
                className="product-detail-slider"
              >
                {product.images.map((img, index) => (
                  <Box
                    key={`${product._id}-${index}`}
                    sx={{
                      height: { xs: "300px", sm: "400px", md: "500px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                    }}
                  >
                    <img
                      src={img.url}
                      alt={product.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
              </Slider>

              {/* Image thumbnails */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {product.images.map((img, index) => (
                  <Box
                    key={`thumb-${index}`}
                    onClick={() => sliderRef.current.slickGoTo(index)}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      overflow: "hidden",
                      border:
                        currentSlide === index
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      cursor: "pointer",
                      opacity: currentSlide === index ? 1 : 0.7,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            {/* Product Status */}
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip
                label={product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                color={product.stock > 0 ? "success" : "error"}
                size="small"
                variant="outlined"
              />
              <Chip
                label={product.category}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Stack>

            {/* Product Name and ID */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mt: 1,
                mb: 1,
                fontSize: { xs: "1.8rem", sm: "2.2rem" },
              }}
            >
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Product ID: #{product._id}
            </Typography>

            {/* Rating */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Rating value={product.ratings} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({product.numOfReviews || 0} Reviews)
              </Typography>
            </Stack>

            {/* Price */}
            <Typography
              variant="h4"
              color="primary"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              ₹{product.price}
            </Typography>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Quantity:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={decQuan}
                  disabled={quan <= 1}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                >
                  <RemoveIcon />
                </IconButton>

                <TextField
                  type="number"
                  size="small"
                  value={quan}
                  inputProps={{
                    min: 1,
                    max: product.stock,
                    style: { textAlign: "center", width: "40px" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <IconButton
                  onClick={incQuan}
                  disabled={quan >= product.stock}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                >
                  <AddIcon />
                </IconButton>

                <Typography variant="body2" color="text.secondary">
                  {product.stock} available
                </Typography>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              disabled={product.stock < 1}
              startIcon={<ShoppingBagIcon />}
              onClick={() => addToCart(product)}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: "50px",
                fontWeight: 600,
              }}
            >
              Add to Cart
            </Button>

            {/* Service Features */}
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <ServiceFeature
                  icon={<LocalShippingOutlinedIcon />}
                  title="Free Shipping"
                  description="On orders over ₹500"
                />

                <ServiceFeature
                  icon={<LoopOutlinedIcon />}
                  title="Easy Returns"
                  description="10 days return policy"
                />

                <ServiceFeature
                  icon={<VerifiedUserOutlinedIcon />}
                  title="Secure Checkout"
                  description="100% Protected Payments"
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            pb: 1,
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "80px",
              height: "3px",
              backgroundColor: "primary.main",
              borderRadius: "2px",
            },
          }}
        >
          Customer Reviews
        </Typography>

        <Box>
          {product.review && product.review.length > 0 ? (
            <Grid container spacing={3}>
              {product.review.map((review, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Review review={[review]} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#f8f9fa",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No reviews yet. Be the first to review this product!
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// Helper component for service features
function ServiceFeature({ icon, title, description }) {
  return (
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "1px solid #f0f0f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
