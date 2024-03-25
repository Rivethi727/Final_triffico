import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="row">
          <h1 style={{textAlign:"center"}}>Booking Success</h1>
          <div className="faq-box">
            <h4 className="emergency-title">If Any Emergency?</h4>
            <p className="emergency-text">
              You can contact us via WhatsApp by scanning the QR code.
            </p>
            <Link to="/scan">
              <a href="scan" className="emergency-btn">
                <i className="uil uil-whatsapp"></i>Chat with us
              </a>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Payment;
