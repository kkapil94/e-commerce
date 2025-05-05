import React from "react";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  Divider,
  Stack,
  Badge,
} from "@mui/material";
import cartStore from "../Stores/cartStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = cartStore((state) => state.cart);
  const remove = cartStore((state) => state.removeItem);
  const setQuantity = cartStore((state) => state.setQuan);
  const navigate = useNavigate();

  // Calculate totals
  let subtotal = 0;
  cartItems.forEach((i) => {
    subtotal = subtotal + i.product.price * i.quantity;
  });

  const shippingCharges = subtotal >= 500 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;

  const handleQuantityChange = (prod, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= prod.stock) {
      setQuantity(prod, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            py: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              mb: 3,
            }}
          >
            <img
              src="/images/preview.png"
              alt="Empty cart"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500 }}
          >
            Looks like you haven't added any products to your cart yet. Browse
            our collection and discover amazing products!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
            startIcon={<ShoppingCartIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "30px",
            }}
          >
            Start Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 4,
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: 0,
            width: "80px",
            height: "3px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
          },
        }}
      >
        Shopping Cart
        <Badge
          badgeContent={cartItems.length}
          color="primary"
          showZero
          sx={{ ml: 2 }}
        />
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Product
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 8 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ width: 100, textAlign: "center" }}
                >
                  Quantity
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ width: 100, textAlign: "right" }}
                >
                  Price
                </Typography>
              </Box>
            </Box>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <Box key={item.product._id}>
                <Box sx={{ p: 3 }}>
                  <Grid container alignItems="center" spacing={2}>
                    {/* Product Image */}
                    <Grid item xs={3} sm={2}>
                      <Box
                        component="img"
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        sx={{
                          width: "100%",
                          aspectRatio: "1/1",
                          objectFit: "contain",
                          borderRadius: 1,
                          border: "1px solid #f0f0f0",
                        }}
                      />
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={9} sm={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        {item.product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Category: {item.product.category}
                      </Typography>

                      <Button
                        variant="text"
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        size="small"
                        onClick={() => remove(item.product)}
                        sx={{
                          p: 0,
                          minWidth: "auto",
                          "&:hover": { background: "transparent" },
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>

                    {/* Quantity Controls */}
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", sm: "center" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <TextField
                          value={item.quantity}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            inputProps: {
                              min: 1,
                              max: item.product.stock,
                              style: {
                                textAlign: "center",
                                width: "30px",
                                padding: "4px 0",
                              },
                            },
                          }}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            handleQuantityChange(item.product, value);
                          }}
                        />

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>

                    {/* Price */}
                    <Grid item xs={12} sm={3}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "flex-start", sm: "flex-end" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          color="primary.main"
                        >
                          ₹
                          {(
                            item.quantity * item.product.price
                          ).toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              position: "sticky",
              top: 24,
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 3,
                py: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Order Summary
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    Subtotal ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ₹{subtotal.toLocaleString()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {shippingCharges === 0 ? "Free" : `₹${shippingCharges}`}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">Tax (18% GST)</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ₹{tax.toFixed(2)}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="primary.main"
                  >
                    ₹{total.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleCheckout}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Proceed to Checkout
                </Button>

                {/* Shipping policy */}
                <Box sx={{ mt: 2, bgcolor: "#f8f9fa", p: 2, borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {subtotal >= 500 ? (
                      <span>✓ Your order qualifies for FREE Shipping</span>
                    ) : (
                      <span>
                        Add ₹{500 - subtotal} more to get FREE Shipping
                      </span>
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
