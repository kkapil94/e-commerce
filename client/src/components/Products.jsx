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
import useProducts from "../Stores/productStore";
import ProductCard from "./ProductCard";

export default function Products() {
  const params = useParams();
  const [page, setPage] = React.useState(1);
  const [price, setPrice] = React.useState({min:0,max:25000});
  const [sliVal,setSliVal] = React.useState([0,25000])
  const [category, setCategory] = React.useState('');
  const categories = ["Electronics","Fashion","Toys","Tools and Equipments","Sports"]
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handlePrice = (e,newValue) => {
    setPrice({...price,[e.target.name]:e.target.value})
    setSliVal([price.min,price.max])
  };
  const handleSlider = (e,newValue) => {
    setSliVal(newValue)
    setPrice({min:sliVal[0],max:sliVal[1]})
  };
  const fetchProducts = useProducts((state) => state.fetchProducts);
  const products = useProducts((state) => state.products.product);
  const details = useProducts((state) => state.products);
  const keyword = params.keyword;
  useEffect(() => {
    fetchProducts(keyword, page, sliVal, category);
  }, [fetchProducts, keyword, page, price, category,sliVal]);

  return (
    <>
      <Fragment sx={{background:"#f1f3f6"}}>
        <Grid sx={{ marginTop: "5rem" }} container>
          <Grid item lg={2.5} sm={2.5} sx={{ background: "#fff" }}>
            <Box >
              <Box>
                <Typography variant="h5" sx={{margin: "1rem 1rem 2rem 0",border:"1px solid #b1aeae",width:"100%",padding:".5rem",color:'#94ada7'}}>
                  Sort By
                </Typography>
                <Stack spacing={2} justifyContent="center" sx={{paddingLeft:"1rem"}}>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>Low to high</Button>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>High to low</Button>
                  <Button variant="outlined" size="small" sx={{width:"95%"}}>Rating</Button>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h5" sx={{margin: "2rem 0rem 1rem 0",border:"1px solid #b1aeae",width:"100%",padding:".5rem",color:"#94ada7"}}>Filter</Typography>
                <Box sx={{padding:"0 1rem 0 1rem",color:"#94ada7"}}>
                  <Typography variant="subtitle1">Price</Typography>
                <Slider
                  size="medium"
                  value={sliVal}
                  onChange={handleSlider}
                  min={0}
                  max={25000}
                  sx={{width:"100%"}}
                />
                <Box sx={{display:'flex'}}>
                  <TextField variant="outlined" name="min" label="min" type={"number"} value={price.min} onChange={handlePrice}/>
                  <TextField variant="outlined" name="max" label="max" type={"number"} value={price.max} onChange={handlePrice}/>
                </Box>
                </Box>
                <Box sx={{padding:"0 1rem 0 1rem"}}>
                  <Typography variant="subtitle1" sx={{margin:"2rem 0 1rem 0",color:"#94ada7"}}>Categories</Typography>
                  <List>
                    {categories.map(category=>(
                    <ListItem key={category} disablePadding>
                      <ListItemButton>
                        <ListItemText onClick={()=>setCategory(category)} >{category}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={9.5} sm={9.5} xs={12} sx={{  }}>
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
