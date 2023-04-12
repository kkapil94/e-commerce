import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../Stores/productStore";
import ProductCard from "./ProductCard";

export default function Products() {
  const params = useParams();
  const [page, setPage] = React.useState(1);
  const [price, setPrice] = React.useState({ min: 0, max: 25000 });
  const [sliVal, setSliVal] = React.useState([0, 25000]);
  const [category, setCategory] = React.useState("");
  const [state, setState] = useState("none");
  const [sort, setSort] = useState("none");
  const categories = [
    "Electronics",
    "Fashion",
    "Toys",
    "Tools and Equipments",
    "Sports",
  ];
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handlePrice = (e, newValue) => {
    setPrice({ ...price, [e.target.name]: e.target.value });
    setSliVal([price.min, price.max]);
  };
  const handleSlider = (e, newValue) => {
    setSliVal(newValue);
    setPrice({ min: sliVal[0], max: sliVal[1] });
  };
  const fetchProducts = useProducts((state) => state.fetchProducts);
  const products = useProducts((state) => state.products.product);
  const details = useProducts((state) => state.products);
  const keyword = params.keyword;

  useEffect(() => {
    fetchProducts(keyword, page, sliVal, category);
  }, [fetchProducts, keyword, page, price, category, sliVal]);

  return (
    <Box sx={{ background: "#f1f3f6", padding: ".5rem"}}>
      <Grid container justifyContent="space-around">
        <Grid item lg={2.2} md={2.2} sm={11.9} sx={{ background: "#fff" }}>
          <Box>
            <Box
              sx={{
                position: { lg: "initial", md: "initial", sm: "absolute" ,xs:"absolute"},
                top: {sm:"7.9rem"},
                bottom:{lg:"initial",md:"initial",sm:"initial",xs:"0"},
                width: "98%",
                display:{lg:"initial",md:"initial",sm:"initial",xs:sort},
                height:{lg:"initial",md:"initial",sm:"initial",xs:"50vh"},
                background:"#fff"
              }}
            >
              <Typography
                sx={{
                  typography: { lg: "h5", md: "h6", sm: "subtitle1",xs:"subtitle1" },
                  margin: {
                    lg: "1rem 1rem 2rem 0",
                    md: "1rem 1rem 2rem 0",
                    sm: "0",
                    xs: "0"
                  },
                  border: {
                    lg: "1px solid #b1aeae",
                    md: "1px solid #b1aeae",
                    sm: "0",
                    xs: "0"
                  },
                  width: { lg: "100%", md: "100%", sm: "3.2rem" ,xs:"3.2rem"},
                  display: { sm: "inline-block" },
                  padding: { lg: ".5rem", md: ".5rem", sm: "0",xs:"0" },
                  color: "#94ada7",
                }}
              >
                Sort By:
              </Typography>
              <Stack
                spacing={2}
                justifyContent="center"
                alignItems={"center"}
                sx={{
                  paddingLeft: { lg: "1rem", md: "1rem", sm: 0 ,xs:0},
                  flexDirection: { lg: "column", md: "column", sm: "row",xs:"column" },
                  display: { lg: "inherit", md: "inherit", sm: "inline" ,xs:"flex"},
                  justifyContent:"space-evenly",
                  height:"70%"
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: { lg: "95%", md: "95%", sm: "5.2rem",xs:"5.2rem" },
                    border: "none !important",
                    margin: {
                      lg: "initial !important",
                      md: "initial !important",
                      sm: "0 !important",
                      xs:"0 !important"
                    },
                  }}
                  onClick={()=>setSort("none")}
                >
                  Low to high
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: { lg: "95%", md: "95%", sm: "5.2rem",xs:"5.2rem" },
                    border: "none !important",
                    margin: {
                      lg: "initial !important",
                      md: "initial !important",
                      sm: "0 !important",
                      xs: "0 !important",
                    },
                  }}
                  onClick={()=>setSort("none")}
                >
                  High to low
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: { lg: "95%", md: "95%", sm: "2rem",xs:"2rem" },
                    border: "none !important",
                    margin: {
                      lg: "initial !important",
                      md: "initial !important",
                      sm: "0 !important",
                      xs: "0 !important",
                    },
                  }}
                  onClick={()=>setSort("none")}
                >
                  Rating
                </Button>
              </Stack>
              <Button
                variant="outlined"
                onClick={() => setState("initial")}
                size="small"
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "initial",
                    xs: "none",
                  },
                  position: { lg: "inherit", md: "inherit", sm: "absolute" ,xs:"absolute"},
                  right: "2rem",
                  top: "-.8rem",
                  borderColor: "gray",
                  color: "gray",
                }}
                
              >
                Filters
              </Button>
            </Box>
            <Box sx={{ display: { lg: "initial", md: "initial",sm:state,xs:state} ,background:"#fff",zIndex:"1",position:{lg:"relative",md:"relative",sm:"fixed",xs:"fixed"},height:"100%",width:{lg:"100%",md:"100%",sm:"97vw",xs:"97vw"},zIndex:1101,marginBottom:{lg:0,md:0,sm:"1rem"}}}>
              <Typography
                variant="h5"
                sx={{
                  margin: {lg:"2rem 0rem 1rem 0",md:"2rem 0rem 1rem 0",sm:"0rem",xs:"0rem"},
                  border: "1px solid #b1aeae",
                  width: "100%",
                  padding: ".5rem",
                  color: "#94ada7",
                  background:"#fff"
                }}
              >
                Filter
              </Typography>
              <Box sx={{ padding: "0 1rem 0 1rem", color: "#94ada7" }}>
                <Typography variant="subtitle1">Price</Typography>
                <Slider
                  size="medium"
                  value={sliVal}
                  onChange={handleSlider}
                  min={0}
                  max={25000}
                  sx={{ width: {lg:"100%",md:"100%",sm:"70%",xs:"70%"} }}
                />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    name="min"
                    label="min"
                    type={"number"}
                    value={price.min}
                    onChange={handlePrice}
                  />
                  <TextField
                    variant="outlined"
                    name="max"
                    label="max"
                    type={"number"}
                    value={price.max}
                    onChange={handlePrice}
                  />
                </Box>
              </Box>
              <Box sx={{ padding: "0 1rem 0 1rem" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ margin: {lg:"2rem 0 1rem 0",md:"2rem 0 1rem 0",sm:'.5rem 0 0 0'}, color: "#94ada7" }}
                >
                  Categories
                </Typography>
                <List>
                  {categories.map((category) => (
                    <ListItem key={category} disablePadding>
                      <ListItemButton>
                        <ListItemText onClick={() => setCategory(category)}>
                          {category}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Button variant="outlined" sx={{display:{lg:"none",md:"none",sm:"inline"},width:"100%"}} onClick={()=>setState("none")}>Submit</Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          lg={9.7}
          md={9.7}
          sm={11.9}
          xs={11.9}
          sx={{ background: "#fff" }}
        >
          
          <Typography
            align="center"
            sx={{
              typography:{lg:"h4",md:"h4",sm:"h4",xs:"h6"},
              color: "#424040",
              borderBottom: "2px solid #b1aeae",
              width: {lg:"25rem",md:"25rem",sm:"25rem",xs:"60%"},
              paddingBottom: { lg: "1rem", md: "1rem", sm: "0rem",xs: "0rem" },
              textAlign: "center",
              margin: {
                lg: "0 auto 0rem auto",
                md: "0 auto 2rem auto",
                sm: "0 auto 2rem auto",
                xs: "3rem auto 2rem auto",
              },
            }}
          >
            Products
          </Typography>
          <Stack sx={{display:{lg:"none",md:"none",sm:"none",xs:"inline"}}} direction={"row"}>
            <Button sx={{width:"50%",borderLeft:"0 !important",borderRadius:"0"}} size="small" variant="outlined" onClick={()=>setSort("initial")}>
              Sort
            </Button>
            <Button sx={{width:"50%",borderRadius:"0",borderRight:"0 !important"}} size="small" variant="outlined" onClick={()=>setState("initial")}>
              Filters
            </Button>
          </Stack>
          <Stack
            direction={"row"}
            flexWrap="wrap"
            alignItems={"center"}
            justifyContent="center"
            sx={{
              borderTop: {lg:"none",md:"none",sm:".5px solid gray",xs:'none'},
              marginTop: { lg: "0", md: "0", sm: "1rem" ,xs:"1rem"},
            }}
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
          {products.length === details.resultPerPage && (
            <Pagination
              count={
                details &&
                Math.ceil(details.countProducts / details.resultPerPage)
              }
              page={page}
              onChange={handleChange}
              variant="outlined"
              size="large"
              sx={{
                display: "flex",
                marginTop: "5rem",
                justifyContent: "center",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
