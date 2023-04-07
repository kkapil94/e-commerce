import {
  Box,
  Button,
  Grid,
  Rating,
  Typography,
  TextField,
  IconButton,
  Container,
  Input,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import useProducts from "../Stores/productStore";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Review from "../components/Review";
import "./ProductDetails.css"
import cartStore from "../Stores/cartStore";

export default function ProductDetails() {
  const { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  const [quan,setQuan] = useState(1)
  const productDetails = useProducts((state) => state.productDetails);
  const fetchProductDetails = useProducts((state) => state.fetchProductDetails);
  const addItem = cartStore(state=>state.addToCart)
  const incQuan = ()=>{
    if(productDetails.product.stock>quan){
      setQuan(quan+1)
    }
    else{return quan}
  }
  const decQuan = ()=>{
    if(quan>1){
      setQuan(quan-1)
    }
    else{return quan}
  }
  const addToCart = (product)=>{
    addItem(product,quan)
  }
  useEffect(() => {
    fetchProductDetails(id);
  }, [id, fetchProductDetails]);

  return (
    <Fragment>
      {productDetails && (
        <Grid
          container
          alignItems={"center"}
          sx={{
            height: "100vh",
            overflow: "hidden",
            padding: "2rem 5rem 5rem 5rem",
          }}
        >
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            sx={{ border: "1px solid #f0f0f0", paddingBottom: "4rem" }}
          >
            <Box>
              <Slider {...settings}>
                {productDetails.product.images.map((img) => (
                  <Box key={productDetails.product._id}>
                    <img
                      src={img.url}
                      alt=""
                      style={{
                        height: "25rem",
                        width: "50%",
                        margin: "auto",
                        paddingTop: "2rem",
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            sx={{ paddingLeft: "2rem" }}
          >
            <Box>
              <Box>
                <Typography variant="h5">
                  {productDetails.product.name}
                </Typography>
                <Typography variant="body2">
                  #{productDetails.product._id}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid white",
                  borderTop: "1px solid white",
                }}
              >
                <Rating
                  sx={{ padding: "1rem 0" }}
                  value={productDetails.product.ratings}
                  readOnly
                  size="small"
                />
              </Box>
              <Typography variant="h5" sx={{ margin: "1rem 0" }}>
                ₹{productDetails.product.price}
              </Typography>
              <Box
                sx={{ borderBottom: "1px solid black", paddingBottom: "1rem" }}
              >
                <IconButton size="small" onClick={decQuan}>
                  <RemoveIcon />
                </IconButton>
                <Input 
                 type="number"
                  size="sm"
                  value={quan}
                  slotProps={{
                    input: {
                      min: 1,
                      max: productDetails.product.stock
                    },
                  }}
                />
                <IconButton size="small" onClick={incQuan}>
                  <AddIcon />
                </IconButton>
                <Button variant="contained" sx={{ borderRadius: "2rem" }} onClick={()=>addToCart(productDetails.product)}>
                  Add to cart
                </Button>
              </Box>
              <Box sx={{ borderBottom: "1px solid black", padding: "1rem 0" }}>
                <Typography variant="subtitle1">
                  Status:
                  {productDetails.product.stock < 1
                    ? "Out Of Stock"
                    : "In Stock"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ padding: "1rem 0" }}>
                  Description:{productDetails.product.description}
                </Typography>
                <Button variant="contained" sx={{ borderRadius: "2rem" }}>
                  Submit Review
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Box >
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{
            margin: "2rem auto",
            borderBottom: "2px solid black",
            width: "18rem",
            paddingBottom: "1rem",
          }}
        >
          Reviews
        </Typography>
        <Box sx={{ display: "flex",overflow:"auto"}}>
          {productDetails && productDetails.product.review[0] ? (
            <Review review={productDetails.product.review} />
          ) : (
            "No reviews"
          )}
        </Box>
      </Box>
    </Fragment>
  );
}
