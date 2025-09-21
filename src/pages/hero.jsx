// src/components/Hero.js
import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../assets/css/hero.css";

import Motor from "../assets/images/6 Brushless Motor 9v-12v - 320tk.png";
import Type_C_Port from "../assets/images/Type C Port -25tk.png";
import PowerBank from "../assets/images/20000mah PowerBank Cas ... out Battery-650tk .png";
import Head_Mist_Meker from "../assets/images/4 Head Mist Meker -350tk .png";
import X14015_5a from "../assets/images/Xl4015 5a- 160tk.png";


const initialProducts = [
  {
    id: 1,
    image: Motor,
    saveBDT: 80,
    oldPrice: 400,
    newPrice: 320,
    categorey: "motor",
    title: "Mini Humidifier | Portable Air Humidifier | USB Powered | 30ml/h | 200ml Water Tank",
    description: "Portable mini humidifier. USB powered. 30ml/h mist output. 200ml water tank. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Minimum order quantity is 1 piece. For bulk orders, please contact us. Delivery time is 3-5 business days. Warranty is 6 months. Minimum order quantity is 1 piece. For bulk orders, please contact us. Delivery time is 3-5 business days. Warranty is 6 months. Mini Humidifier | Portable Air Humidifier | USB Powered | 30ml/h | 200ml Water Tank. Portable mini humidifier. USB powered. 30ml/h mist output. 200ml water tank. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Minimum order quantity is 1 piece. For bulk orders, please contact us. Delivery time is 3-5 business days. Warranty is 6 months. Minimum order quantity is 1 piece. For bulk orders, please contact us. Delivery time is 3-5 business days. Warranty is 6 months.",
    quantity: 10,
    totalSales: 50,
    images: [Motor],
    videoUrl: '',
    colors: ['Black', 'White', 'Blue'],
  },
  {
    id: 2,
    image: Type_C_Port,
    saveBDT: 15,
    oldPrice: 40,
    newPrice: 25,
    categorey: "accessory",
    title: "Type C Port | USB Type C Connector | 3.5mm Jack | Charging Port Replacement",
    description: "USB Type C Connector. 3.5mm Jack. Charging Port Replacement. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    quantity: 20,
    totalSales: 200,
    images: [Type_C_Port],
    videoUrl: '',
    colors: ['White', 'Black'],
  },
  {
    id: 3,
    image: PowerBank,
    saveBDT: 150,
    oldPrice: 800,
    newPrice: 650,
    categorey: "accessory",
    title: "Power Bank | 20000mAh | Dual USB Output | LED Display | Fast Charging",
    description: "20000mAh Power Bank. Dual USB Output. LED Display. Fast Charging. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    quantity: 50,
    totalSales: 150,
    images: [PowerBank],
    videoUrl: '',
    colors: ['Red', 'Black'],
  },
  {
    id: 4,
    image: Head_Mist_Meker,
    saveBDT: 150,
    oldPrice: 500,
    newPrice: 350,
    categorey: "accessory",
    title: '4 Head Mist Maker | Ultrasonic Humidifier | Adjustable Mist Output | 300ml Water Tank',
    description: "4 Head Mist Maker. Ultrasonic Humidifier. Adjustable Mist Output. 300ml Water Tank. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    quantity: 30,
    totalSales: 75,
    images: [Head_Mist_Meker],
    videoUrl: 'https://www.youtube.com/embed/z44q807o6uE',
    colors: ['Blue', 'Green'],
  },
  {
    id: 5,
    image: X14015_5a,
    saveBDT: 20,
    oldPrice: 200,
    newPrice: 160,
    categorey: "accessory",
    title: 'Xl4015 5a | DC-DC Buck Converter | Adjustable Voltage Regulator | 5A Output',
    description: "Xl4015 5a. DC-DC Buck Converter. Adjustable Voltage Regulator. 5A Output. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    quantity: 80,
    totalSales: 90,
    images: [X14015_5a],
    videoUrl: '',
    colors: ['Grey'],
  },
];

const Hero = () => {
  const { cartItems, addToCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // State to hold the current sort option
  const [sortOption, setSortOption] = useState("popular");

  // Memoized function to sort products based on the selected option
  const sortedProducts = useMemo(() => {
    // Create a mutable copy of the initial array
    const sorted = [...initialProducts];

    switch (sortOption) {
      case "popular":
        return sorted.sort((a, b) => b.totalSales - a.totalSales);
      case "latest":
        // Sort by ID in descending order to simulate 'latest'
        return sorted.sort((a, b) => b.id - a.id);
      case "price_low":
        return sorted.sort((a, b) => a.newPrice - b.newPrice);
      case "price_high":
        return sorted.sort((a, b) => b.newPrice - a.newPrice);
      default:
        return sorted;
    }
  }, [sortOption]); // Re-run the sorting logic whenever sortOption changes

  const handleProductClick = (product) => {
    navigate(`/product_view/${product.id}`, { state: { product } });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="hero-section-container">
      <div className="sort-section">
        <div className="all-products-text">All Products</div>
        <div className="all-products-text">Sort by: &nbsp;
          <select className="sort-select" style={{outline: 'none'}} onChange={handleSortChange} value={sortOption}>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {sortedProducts.map((product) => {
          const inCart = cartItems.find((item) => item.id === product.id);
          return (
            <div className="product-card" key={product.id}>
              <div
                className="product-image-container"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="save-badge">Save {product.saveBDT} BDT</div>
              </div>
              <div className="product-info">
                <p className="product-description" style={{textTransform: 'uppercase'}}>{product.categorey}</p>
                <div className="product-price">
                  <span className="old-price">Tk {product.oldPrice}</span>
                  <span className="new-price">Tk {product.newPrice}</span>
                </div>
                <h3 className="product-title" onClick={() => handleProductClick(product)}>
                  {product.title}
                </h3>
                <div className="product-actions">
                  {inCart ? (
                    <div className="quantity-selector">
                      <button className="quantity-btn" onClick={() => updateQuantity(product.id, -1)}>-</button>
                      <span className="quantity-display">{inCart.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(product.id, 1)}>+</button>
                    </div>
                  ) : (
                    <button className="add-to-cart-btn" onClick={() => addToCart(product, 1)}>
                      <i className="fas fa-shopping-cart"></i> Add to cart
                    </button>
                  )}
                  <button
                    className="buy-now-btn"
                    onClick={() => {
                      addToCart(product, 1);
                      navigate("/checkout");
                    }}
                  >
                    <i className="fas fa-bolt"></i> Buy now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;