import React from "react";
import {
  Card,
  CardContent,
  Box,
  Rating,
  Typography,
  Chip,
  CardActionArea,
} from "@mui/material";

export default function ProductCard({ products }) {
  const product = products;

  return (
    <Card
      className="product-card"
      sx={{
        width: { xs: "160px", sm: "220px", md: "250px" },
        height: "auto",
        margin: "1rem 0.8rem",
        overflow: "hidden",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <CardActionArea>
        {product.stock < 5 && product.stock > 0 && (
          <Chip
            label="Low Stock"
            color="warning"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          />
        )}
        {product.stock === 0 && (
          <Chip
            label="Out of Stock"
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          />
        )}

        <Box
          sx={{
            height: { xs: "160px", sm: "200px", md: "220px" },
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{
              height: "90%",
              width: "90%",
              objectFit: "contain",
              transition: "transform 0.5s ease",
            }}
          />
        </Box>

        <CardContent sx={{ padding: "16px", backgroundColor: "#fff" }}>
          <Typography
            variant="h6"
            component="div"
            className="text-ellipsis"
            sx={{
              fontSize: { xs: "1rem", sm: "1.15rem" },
              fontWeight: 600,
              marginBottom: "4px",
              height: "1.5em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Rating
              name="product-rating"
              value={product.ratings}
              readOnly
              size="small"
              precision={0.5}
              sx={{ zIndex: 0 }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              ({product.numOfReviews || 0} reviews)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              ₹{product.price}
            </Typography>

            <Chip
              label={product.category}
              size="small"
              variant="outlined"
              sx={{
                height: "20px",
                fontSize: "0.7rem",
                fontWeight: 400,
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
