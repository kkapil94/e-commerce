import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  TextField,
  Badge,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import userStore from "../Stores/userStore";
import cartStore from "../Stores/cartStore";
import "./Navbar.css";

export default function Navbar() {
  const user = userStore((state) => state.user);
  const cartItems = cartStore((state) => state.cart);
  const [drawer, setDrawer] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setKeyword("");
    } else {
      navigate("/products");
      setKeyword("");
    }
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        boxShadow: scrolled ? "0px 2px 8px rgba(0,0,0,0.1)" : "none",
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
      }}
      elevation={scrolled ? 3 : 0}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              sx={{ display: { md: "none" }, mr: 1 }}
              onClick={() => setDrawer(true)}
            >
              <MenuRoundedIcon />
            </IconButton>

            <Link to="/">
              <Box
                sx={{
                  width: { xs: "40px", sm: "50px" },
                  height: { xs: "40px", sm: "50px" },
                  marginRight: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/new_logo.svg"
                  alt="KK Mart Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </Box>
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "#333",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/products"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "#333",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Products
              </Button>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flexGrow: 1,
              maxWidth: { sm: "400px", md: "500px" },
              mx: { xs: 1, sm: 2, md: 4 },
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: keyword && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setKeyword("")}>
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "24px",
                  background: scrolled ? "#f8f9fa" : "#f0f2f5",
                  transition: "all 0.3s ease",
                  "&:hover": { background: "#e9ecef" },
                },
              }}
            />
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: "#333",
                transition: "all 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlinedIcon fontSize="medium" />
              </Badge>
            </IconButton>

            <IconButton
              component={Link}
              to={user ? "/account" : "/login"}
              sx={{
                ml: { xs: 1, sm: 2 },
                color: "#333",
                transition: "all 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              {user ? (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #1976d2",
                  }}
                >
                  <img
                    src={user.avatar.url}
                    alt="User"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ) : (
                <AccountCircleOutlinedIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/new_logo.svg"
                alt="KK Mart Logo"
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  borderRadius: "4px",
                }}
              />
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                  background: "linear-gradient(45deg, #1976d2, #f50057)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KK Mart
              </span>
            </Box>
            <IconButton onClick={() => setDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => setDrawer(false)}
            >
              <ListItemText
                primary="Home"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.3rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/products"
              onClick={() => setDrawer(false)}
            >
              <ListItemText
                primary="Products"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.3rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={() => setDrawer(false)}
            >
              <ListItemText
                primary="Cart"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.3rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={user ? "/account" : "/login"}
              onClick={() => setDrawer(false)}
            >
              <ListItemText
                primary={user ? "My Account" : "Login"}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.3rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
