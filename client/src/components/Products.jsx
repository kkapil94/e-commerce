import {
  Box,
  Button,
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
import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../store";
import ProductCard from "./ProductCard";

export default function Products() {
  const params = useParams();
  const [page, setPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 25000]);
  const [category, setCategory] = React.useState('');
  const categories = ["Electronics","Fashion","Toys","Tools and Equipments","Sports"]
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handlePrice = (event, newprice) => {
    setPrice(newprice);
  };
  const fetchProducts = useProducts((state) => state.fetchProducts);
  const products = useProducts((state) => state.products.product);
  const details = useProducts((state) => state.products);
  const keyword = params.keyword;
  useEffect(() => {
    fetchProducts(keyword, page, price, category);
    console.log(category,products,products.length);
  }, [fetchProducts, keyword, page, price, category]);

  return (
    <>
      <Fragment>
        <Grid sx={{ marginTop: "5rem" }} container>
          <Grid item lg={2} sm={2} sx={{ background: "red" }}>
            <Box >
              <Box>
                <Typography variant="h5" sx={{margin: "1rem 1rem 2rem 0",border:"1px solid black",width:"100%",padding:".5rem"}}>
                  Sort By
                </Typography>
                <Stack spacing={2} justifyContent="center" sx={{paddingLeft:"1rem"}}>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>Low to high</Button>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>High to low</Button>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>Rating</Button>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h5" sx={{margin: "2rem 0rem 1rem 0",border:"1px solid black",width:"100%",padding:".5rem"}}>Filter</Typography>
                <Box sx={{padding:"0 1rem 0 1rem"}}>
                  <Typography variant="subtitle1" sx={{margin:"0 0 2rem 0"}}>Price</Typography>
                <Slider
                  size="medium"
                  value={price}
                  onChange={handlePrice}
                  valueLabelDisplay="auto"
                  min={0}
                  max={25000}
                  sx={{width:"12rem"}}
                />
                <Box sx={{display:'flex'}}>
                  <TextField variant="outlined" label="min" type={"number"} value={price[0]} onChange={handleChange}/>
                  <TextField variant="outlined" label="max" type={"number"} value={price[1]} onChange={handleChange}/>
                </Box>
                </Box>
                <Box sx={{padding:"0 1rem 0 1rem"}}>
                  <Typography variant="subtitle1" sx={{margin:"2rem 0 1rem 0"}}>Categories</Typography>
                  <List>
                    {categories.map(category=>(
                    <ListItem key={category} disablePadding>
                      <ListItemButton>
                        <ListItemText onClick={()=>setCategory(category)}>{category}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={10} sm={10} xs={12} sx={{  }}>
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
            {products.length === details.resultPerPage  && (
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
      </Fragment>
    </>
  );
}
