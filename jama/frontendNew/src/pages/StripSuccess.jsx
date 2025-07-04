import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const StripeSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { model, service, price } = location.state || {};

  // اگر اطلاعات نبود، برگرد به خانه
  useEffect(() => {
    if (!model || !service || !price) {
      navigate("/");
    }
  }, [model, service, price, navigate]);

  return (
    <div className="success-container">
      <div className="card">
        <h1>✅ Payment Successful</h1>
        <p>Your booking has been confirmed and payment received.</p>

        <div className="details">
          <p><strong>Model:</strong> {model}</p>
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Total Paid:</strong> €{price}</p>
        </div>

        <button className="home-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default StripeSuccess;
