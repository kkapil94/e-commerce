import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";

export default function HomePoster() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #f5f7fa, #e8edf2)",
        paddingY: { xs: 4, sm: 6, md: 8 },
        marginBottom: 4,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={6} sx={{ zIndex: 2 }}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                padding: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 500,
                  letterSpacing: 1,
                }}
              >
                SUMMER SALE 2025
              </Typography>

              <Typography
                variant="h2"
                component="h1"
                sx={{
                  my: 2,
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  lineHeight: 1.2,
                  background: "linear-gradient(45deg, #1976d2, #f50057)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Lowest Prices
                <br />
                Best Quality
                <br />
                Shopping
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: "500px",
                  color: "#666",
                  mx: { xs: "auto", md: "0" },
                }}
              >
                Discover our exceptional selection of high-quality products at
                unbeatable prices. Shop the latest trends with confidence.
              </Typography>

              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                endIcon={<ShoppingBagIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: "30px",
                  boxShadow: "0 8px 20px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(25, 118, 210, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Shop Now
              </Button>
            </Box>

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{
                mt: 4,
                py: 2.5,
                px: { xs: 1, sm: 3 },
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Feature
                icon="/images/freeDelivery.svg"
                title="Free Shipping"
                subtitle="On all orders"
              />

              <Feature
                icon="/images/cod.svg"
                title="Cash on Delivery"
                subtitle="Available"
              />

              <Feature
                icon="/images/easyReturns.svg"
                title="Easy Returns"
                subtitle="10 days policy"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "300px", sm: "400px", md: "500px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "500px",
                  height: "500px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, rgba(245, 0, 87, 0.1), rgba(25, 118, 210, 0.1))",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              />

              <Box
                component="img"
                src="/images/prod.jpg"
                alt="Featured products"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  zIndex: 2,
                  borderRadius: "20px",
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  transform: { md: "scale(1.05)" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Feature component for the three service indicators
function Feature({ icon, title, subtitle }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
          borderRadius: "50%",
          backgroundColor: "rgba(25, 118, 210, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 1.5,
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{
            width: "60%",
            height: "60%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            display: { xs: "none", sm: "block" },
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
