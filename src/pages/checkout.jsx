// src/pages/Checkout.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../assets/css/checkout.css";
import { Link } from "react-router-dom";
// import cartItemImage from '../assets/images/cameras.png';

const divisions = [
  { value: "", label: "Select Division" },
  { value: "dhaka", label: "Dhaka", deliveryCharge: 70 },
  { value: "others", label: "Others", deliveryCharge: 120 },
];
const districts = {
  "": [{ value: "", label: "Select District" }],
  dhaka: [
    { value: "dhaka", label: "Dhaka" }, 
    { value: "savar", label: "Savar" },
    { value: "gazipur", label: "Gazipur" }
  ],
  others: [
    { value: "narayanganj", label: "Narayanganj" },
    { value: "chittagong", label: "Chittagong" },
    { value: "khulna", label: "Khulna" }
  ],
};
const upazilas = {
  "": [{ value: "", label: "Select Upazila / P.O" }],
  dhaka: [
    { value: "ramna", label: "Ramna" },
    { value: "motijheel", label: "Motijheel" }
  ],
  savar: [
    { value: "dhamrai", label: "Dhamrai" },
    { value: "ashulia", label: "Ashulia" }
  ],
  gazipur: [
    { value: "kaliganj", label: "Kaliganj" },
    { value: "kapasia", label: "Kapasia" }
  ],
  narayanganj: [
    { value: "bandar", label: "Bandar" },
    { value: "fatulla", label: "Fatulla" }
  ],
  chittagong: [
    { value: "chawkbazar", label: "Chawkbazar" },
    { value: "pahartali", label: "Pahartali" }
  ],
  khulna: [
    { value: "sonadanga", label: "Sonadanga" },
    { value: "daulatpur", label: "Daulatpur" }
  ],
};

const Checkout = () => {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext);
  
  // State for form inputs (now controlled components)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [paymentOption, setPaymentOption] = useState("bkash");
  const [discountCode, setDiscountCode] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [bkashPaymentType, setBkashPaymentType] = useState("full");

  const itemsToShow = cartItems;
  const subTotal = itemsToShow.reduce((sum, item) => sum + (item.newPrice || item.price) * item.quantity, 0);
  const vatTax = 0;
  const deliveryCharge = divisions.find((div) => div.value === selectedDivision)?.deliveryCharge || 0;
  const advancedAmount = deliveryCharge;

  let total;
  if (paymentOption === 'bkash' && bkashPaymentType === 'advanced') {
    total = advancedAmount;
  } else {
    total = subTotal + vatTax + deliveryCharge;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDivisionChange = (e) => {
    const newDivision = e.target.value;
    setSelectedDivision(newDivision);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };
  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    setSelectedUpazila("");
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault(); 

    if (!isTermsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    
    alert("Order Confirmed!");
    console.log("Order Data:", { ...formData, selectedDivision, selectedDistrict, selectedUpazila, total });
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-content-wrapper">
        <div className="place-order-section">
          <h2 className="section-title">Place order</h2>
          <form onSubmit={handleConfirmOrder}>
            <p className="section-subtitle">Your details</p>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group phone-group">
              <label htmlFor="phone">Phone</label>
              <div className="phone-input-wrapper">
                <select className="country-code-select">
                  <option value="+880">+880</option>
                </select>
                <input type="text" id="phone" placeholder="8801313********" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="example@gmail.com" value={formData.email} onChange={handleInputChange} required />
            </div> */}
            <p className="section-subtitle">Your address</p>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Savar Heymatpur (Singair Manikgonj)" value={formData.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group select-group">
              <label htmlFor="division">Division</label>
              <select id="division" className="form-select" onChange={handleDivisionChange} value={selectedDivision} required>
                {divisions.map((div) => (
                  <option key={div.value} value={div.value}>
                    {div.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group select-group">
              <label htmlFor="district">District</label>
              <select id="district" className="form-select" onChange={handleDistrictChange} value={selectedDistrict} required>
                {districts[selectedDivision]?.map((dist) => (
                  <option key={dist.value} value={dist.value}>
                    {dist.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group select-group">
              <label htmlFor="upazila">Upazila / P.O</label>
              <select id="upazila" className="form-select" onChange={(e) => setSelectedUpazila(e.target.value)} value={selectedUpazila} required>
                {upazilas[selectedDistrict]?.map((upazila) => (
                  <option key={upazila.value} value={upazila.value}>
                    {upazila.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group note-group">
              <label htmlFor="note">Add note - (optional): </label>
              <textarea id="note" placeholder="e.g. Please call before delivery"></textarea>
              <span className="note-icon">📝</span>
            </div>
            <p className="section-subtitle">Payment options</p>
            <div className="payment-options">
              <button
                type="button" 
                className={`payment-btn ${paymentOption === "bkash" ? "active" : ""}`}
                onClick={() => {
                  setPaymentOption("bkash");
                  setBkashPaymentType("full");
                }}
              >
                <img src="https://cybersolutionsbd.com/wp-content/uploads/2022/11/Bkash-logo.png" alt="Bkash" /> Bkash
              </button>
              <button
                type="button" 
                className={`payment-btn ${paymentOption === "cashOnDelivery" ? "active" : ""}`}
                onClick={() => setPaymentOption("cashOnDelivery")}
              >
                <img src="https://img.icons8.com/ios-filled/50/000000/cash-on-delivery.png" alt="Cash On Delivery" /> Cash On Delivery
              </button>
            </div>
            {paymentOption === "bkash" && (
              <div className="bkash-sub-options">
                <label className="checkbox-label">
                  <input type="radio" name="bkashPaymentType" checked={bkashPaymentType === "full"} onChange={() => setBkashPaymentType("full")} />
                  Pay full amount
                </label>
                <label className="checkbox-label">
                  <input type="radio" name="bkashPaymentType" checked={bkashPaymentType === "advanced"} onChange={() => setBkashPaymentType("advanced")} />
                  Advanced amount ({advancedAmount} BDT)
                </label>
              </div>
            )}
            <div className="promo-message">
              <p>
                নতুন কাস্টমারদের জন্য 120 টাকা ডেলিভারি চার্জ মওকুফ করে অর্ডার কনফার্ম করতে হবে। <span className="highlight-text">Trusted Electronic BD</span> 🚶
              </p>
            </div>
            <div className="discount-input-group">
              <input type="text" placeholder="Discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="discount-input" />
              <button type="button" className="apply-discount-btn">Apply</button>
            </div>
            <div className="order-summary-details">
              <div className="summary-item">
                <span>Sub Total</span>
                <span>{subTotal} BDT</span>
              </div>
              <div className="summary-item">
                <span>VAT / TAX (0%)</span>
                <span>{vatTax} BDT</span>
              </div>
              <div className="summary-item">
                <span>Delivery charge</span>
                <span>{deliveryCharge} BDT</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>{total} BDT</span>
              </div>
            </div>
            <div className="terms-checkbox">
              <input type="checkbox" id="terms" checked={isTermsAccepted} onChange={(e) => setIsTermsAccepted(e.target.checked)} required />
              <label htmlFor="terms">
                Make sure you accept all of our <a href="#">privacy policy</a>, <a href="#">terms and conditions</a> and{" "}
                <a href="#">refund, return & cancellation policy</a>.
              </label>
            </div>
            <button className="confirm-order-btn" type="submit" disabled={!isTermsAccepted}>
              Total {total} BDT | Confirm order
            </button>
          </form>
        </div>
        <div className="cart-summary-section">
          <h2 className="section-title">Cart</h2>
          <p className="section-subtitle">Selected items</p>
          <div className="cart-item-list">
            {itemsToShow.length > 0 ? (
              itemsToShow.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title || item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.title || item.name}</p>
                    <p className="cart-item-price">BDT {item.newPrice || item.price}</p>
                    <div className="cart-item-quantity-control">
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <Link to="/" className="add-more-items-btn">
            <i className="fas fa-plus"></i> Add more items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;