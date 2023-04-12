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
function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route  path="/products/:keyword" element={<Products />} />
          <Route exact path="/products/product/:id" element={<ProductDetails />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/login" element={<LoginAndSignUp/>} />
          <Route exact path="/account" element={<Account/>} />
          <Route exact path="/forgotPassword" element={<ForgotPasword/>} />
          <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/shipping" element={<Shipping/>} />
          <Route exact path="/order/confirm" element={<OrderConfirm/>} />
          <Route exact path="/payment" element={<PaymentHandler/>} />
          <Route exact path="/order/myOrders/:id" element={<OrderPage/>} />
          <Route exact path="/order/:id" element={<OrderDetails/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
