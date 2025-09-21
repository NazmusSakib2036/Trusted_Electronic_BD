import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import Category from "./pages/catagorey";
import Hero from "./pages/hero";
import ProductView from "./pages/ProductView";
import Checkout from "./pages/checkout";
import { CartProvider } from "./context/CartContext";
import Scroll_top from "./scroll_top/scroll_top";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Scroll_top />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Category />
                <Hero />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product_view/:id" element={<ProductView />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
