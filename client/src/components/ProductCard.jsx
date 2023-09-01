import React, { Fragment } from 'react'
import {
    Card,
    CardContent,
    Box,
    Rating,
    Typography,
  } from "@mui/material";
export default function ProductCard(products) {
    const product = products.products
  return (
    <Fragment>
       {product && <Card
                  sx={{width: "15rem",height:"24.3rem",margin: "2rem .5rem 0 .5rem","&:hover":{transform:"scale(1.1)"},transition:"all .1s ease-in"}}
                >
                  <CardContent sx={{padding:"0"}}>
                    <Box>
                      <img
                        src={product.images[0].url}
                        alt=""
                        style={{ height: "18rem", width: "100%", objectFit:"contain" }}
                      />
                    </Box>
                    <Box sx={{padding:".5rem"}}>
                    <Typography variant="h6">
                      {product.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.ratings}
                      readOnly
                      size="small"
                      sx={{zIndex:0}}
                    />
                    <Typography
                      variant="subtitle2"
                    >
                      ₹{product.price}
                    </Typography>
                    </Box>
                  </CardContent>
                </Card>
}
    </Fragment>
  )
}
