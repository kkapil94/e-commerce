import {
  Box,
  Button,
  Grid,
  Rating,
  Typography,
  IconButton,
  Input,
  Stack,
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
import Loader from "../components/Loader"
import {useAlert} from "react-alert"

export default function ProductDetails() {
 const alert = useAlert()
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
      {!productDetails?<Loader/>: (
        <Grid
          container
          sx={{
            overflow: "hidden",
            padding: {lg:"2rem 1.5rem 1.5rem 1.5rem",md:"2rem 1rem 1rem 1rem",sm:"2rem 1rem 1rem 1rem",xs:"1rem"},
            marginTop:{lg:0,md:0,sm:0,xs:"2rem"}
          }}
        >
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            pb={2}
            sx={{ border: "1px solid #f0f0f0", paddingBottom: "4rem",padding:{lg:"0rem 3.5rem 2rem 3.5rem",md:"0rem 1% 2rem 1%",sm:"0rem 15% 2rem 15%",xs:"2rem 0% 1rem 0%" }}}
          >
            <Stack pb={4}>
              <Slider {...settings}>
                {productDetails.product.images.map((img) => (
                    <Box  key={productDetails.product._id} sx={{width:{lg:"50% ",md:"65%",sm:"50%",xs:"100%"},height:{lg:"25rem",md:"25rem",sm:"25rem",xs:"20rem"},padding: {lg:"1rem",md:"1rem",sm:"1rem",xs:"0"},}}>
                    <img
                      src={img.url}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit:"contain"
                      }}
                    />
                    </Box>
                ))}
              </Slider>
            </Stack>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{ paddingLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:'0'}}}
            container
            justifyContent={"center"}
          >
            <Box sx={{width:"100%",marginTop:"2rem"}}>
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
                <Button variant="contained" sx={{ borderRadius: "2rem" }} onClick={()=>{addToCart(productDetails.product);alert.success("Added to cart Successfully")}}>
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
                <Typography variant="subtitle2" sx={{ padding: "1rem 0" }}>
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
      <Box sx={{marginTop:"4rem"}}>
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{
            margin: "2rem auto",
            borderBottom: "2px solid black",
            width: "18rem",
            paddingBottom: "1rem"
          }}
        >
          Reviews
        </Typography>
        <Box sx={{ display: "flex",flexWrap:"wrap",overflow:"auto",alignItems:"center",justifyContent:"center"}}>
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
