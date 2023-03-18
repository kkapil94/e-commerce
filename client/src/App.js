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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
