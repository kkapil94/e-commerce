import "./index.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Footer from "./components/Footer";
import LoginAndSignUp from "./components/LoginAndSignUp";
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
