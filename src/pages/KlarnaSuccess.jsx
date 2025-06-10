import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const KlarnaSuccess = () => {
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
        <h1>🪙 Klarna Checkout Complete</h1>
        <p>Your payment with Klarna was successful. Your repair is now booked.</p>

        <div className="details">
          <p><strong>Model:</strong> {model}</p>
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Total:</strong> €{price}</p>
        </div>

        <button className="home-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default KlarnaSuccess;
