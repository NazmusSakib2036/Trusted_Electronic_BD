// src/pages/ProductView.js
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../assets/css/product-view.css';

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  // Extract video ID from common YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

const ProductView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { product } = location.state || {};

  // State to manage what's displayed in the main media area
  const [selectedMedia, setSelectedMedia] = useState(product?.images?.[0] || product?.image);
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  // Ref to store the initial product when component mounts
  const initialProductRef = useRef(product);

  // Reset media selection when product changes (e.g., navigating from Hero to another product)
  useEffect(() => {
    if (product) {
      setSelectedMedia(product.images?.[0] || product.image);
      setMediaType('image');
      setSelectedColor(product.colors?.[0] || null);
    }
  }, [product]);

  // If no product data is available (e.g., direct access without state)
  if (!initialProductRef.current) {
    return (
      <div className="not-found-container">
        <p>Product not found. Please go back to the home page. 😢</p>
        <button className="back-btn" onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor);
    alert('Product added to cart! ✅');
  };

  const handleBuyNow = () => {
    addToCart(product, 1, selectedColor);
    navigate('/checkout');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Product link copied! 📋');
  };

  const openFullScreen = (image) => {
    if (mediaType === 'image') { // Only open full screen for images
      setFullScreenImage(image);
    }
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="product-view-wrapper">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="product-view-container">
        {/* Left Section: Image Gallery & Main Image/Video Display */}
        <div className="product-view-media-area">
          <div className="gallery-thumbnail-list">
            {/* Image Thumbnails */}
            {product.images?.map((image, index) => (
              <img
                key={`img-${index}`}
                src={image}
                alt={`thumbnail ${index}`}
                className={`gallery-thumbnail ${selectedMedia === image && mediaType === 'image' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMedia(image);
                  setMediaType('image');
                }}
              />
            ))}
            {/* Video Thumbnail (if videoUrl exists) */}
            {product.videoUrl && (
              <div
                key="video-thumb"
                className={`video-thumbnail-container gallery-thumbnail ${mediaType === 'video' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMedia(product.videoUrl); // Set video URL as selected media
                  setMediaType('video');
                }}
              >
                <img src={getYouTubeThumbnail(product.videoUrl)} alt="Product video thumbnail" />
                <div className="video-play-icon">▶</div>
              </div>
            )}
          </div>

          <div className="product-view-main-media-display">
            {mediaType === 'image' ? (
              <img
                src={selectedMedia}
                alt={product.title}
                className="product-view-main-image"
                onClick={() => openFullScreen(selectedMedia)}
              />
            ) : (
              <div className="video-iframe-container">
                <iframe
                  src={`${selectedMedia}?autoplay=1&rel=0`} // autoplay when selected, disable related videos
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Product Details, Price, Options & Actions */}
        <div className="product-view-details-section">
          <h1 className="product-view-title">{product.title}</h1>
          <p className="product-view-category">Category: {product.categorey}</p>

          <div className="sales-share-row">
            <div className="total-sales">
              মোট বিক্রি: <span className="sales-count">{product.totalSales}</span>
            </div>
          </div>

          <div className="product-view-price-section">
            <span className="product-view-new-price">Tk {product.newPrice}</span>
            <span className="product-view-old-price">Tk {product.oldPrice}</span>
            <span className="product-view-save-badge">Save {product.saveBDT} BDT</span>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="color-options-section">
              <h3>Colors</h3>
              <div className="color-list">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-view-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              <i className="fas fa-bolt"></i> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description Section (at the bottom) */}
      <div className="product-view-description-section">
        <h2 className="description-heading">Product Description</h2>
        <p className="description-text">{product.description}</p>
      </div>

      {/* Full-screen Image Modal */}
      {fullScreenImage && (
        <div className="fullscreen-modal" onClick={closeFullScreen}>
          <button className="close-btn" onClick={closeFullScreen}>
            &times;
          </button>
          <img src={fullScreenImage} alt="Full-screen view" className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default ProductView;