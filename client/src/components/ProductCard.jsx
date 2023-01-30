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
                  sx={{
                    width: "15rem",
                    height: "24rem",
                    margin: "2rem 1rem 0 1rem",
                  }}
                >
                  <CardContent>
                    <Box>
                      <img
                        src={product.images[0].url}
                        alt=""
                        style={{ height: "17rem", width: "100%" }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                      {product.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.ratings}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ marginTop: "0.5rem" }}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Card>
}
    </Fragment>
  )
}
