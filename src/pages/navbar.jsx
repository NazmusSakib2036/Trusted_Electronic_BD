// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../assets/css/navbar.css';
import NavLogo from '../assets/images/nav-logo.png';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Use CartContext to get the actual number of items in the cart
  const { cartItems } = useContext(CartContext);
  const cartItemsCount = cartItems.length;

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="navbar-container">
      {/* Top Bar with Marquee */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="marquee-container">
            <div
              className={`marquee-content ${isMarqueePaused ? 'paused' : ''}`}
              onMouseEnter={() => setIsMarqueePaused(true)}
              onMouseLeave={() => setIsMarqueePaused(false)}
              onClick={() => setIsMarqueePaused(!isMarqueePaused)}
            >
              <span style={{ fontWeight: 'bold' }}>Trusted Electronic BD</span> - তে আপনাকে স্বাগতম। বিশেষ অফার: আজই অর্ডার করুন এবং ১৫% ছাড় পান!
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="main-navbar-content">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={NavLogo} alt="Logo" className="logo" />
            </Link>
          </div>

          <div className="search-box-wrapper">
            <div className={`search-box ${isSearchFocused ? 'focused' : ''}`}>
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                className="search-input"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
              <div className="search-suggestions">
                <div className="suggestion-item">স্মার্টফোন</div>
                <div className="suggestion-item">ল্যাপটপ</div>
                <div className="suggestion-item">টেলিভিশন</div>
                <div className="suggestion-item">হেডফোন</div>
              </div>
            </div>
          </div>
          
          <div className="nav-right">
            <div className="user-actions">
              <div className="language-select">
                <i className="fas fa-globe"></i>
                <span>EN</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="cart-icon" onClick={handleCartClick}>
                <i className="fas fa-shopping-cart"></i>
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;