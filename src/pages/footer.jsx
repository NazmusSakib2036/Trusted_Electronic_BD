import React from 'react';
import { FaFacebook, FaYoutube, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';
import FooterLogo from '../assets/images/nav-logo.png';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <Link to="/" className="nav-logo">
              <img src={FooterLogo} alt="Trusted Electronic BD" className="logo" />
            </Link>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61561476570628" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.youtube.com/@trustedelectronicbd1" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section policies-section">
          <h4>Policies</h4>
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms And Conditions</a></li>
            <li><a href="/return-and-cancellation-policy">Return And Cancellation Policy</a></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <FaEnvelope />
            <span>trustedelectronic.bd.info@gmail.com</span>
          </div>
          <div className="contact-item">
            <FaPhone />
            <span>+8801888058362</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Savar Heymatpur (Singair, Manikgonj)</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} - Copyright Trusted Electronic BD || Design & Development by{' '}
          <a
            href="https://fabtechit.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#4285f4', fontWeight: 'bold' }}
          >
            FabTech.IT
          </a>
        </p>
      </div>

      <a href="https://wa.me/8801888058362" className="whatsapp-icon" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
    </footer>
  );
};

export default Footer;