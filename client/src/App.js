import "./index.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Footer from "./components/Footer";
import LoginAndSignUp from "./components/LoginAndSignUp";
import Account from "./pages/Account";
import ForgotPasword from "./components/ForgotPasword";
import ResetPassword from "./components/ResetPassword";
import Cart from "./pages/Cart";
import Shipping from "./components/Shipping";
import OrderConfirm from "./components/OrderConfirm";
import PaymentHandler from "./components/PaymentHandler";
import { OrderPage } from "./components/OrdersPage";
import OrderDetails from "./components/OrderDetails";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#4791db",
      dark: "#115293",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route
              exact
              path="/products/product/:id"
              element={<ProductDetails />}
            />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/login" element={<LoginAndSignUp />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/forgotPassword" element={<ForgotPasword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<OrderConfirm />} />
            <Route exact path="/payment" element={<PaymentHandler />} />
            <Route exact path="/order/myOrders/:id" element={<OrderPage />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
