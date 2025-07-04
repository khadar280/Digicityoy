




import React, { useState } from "react";
 import "./PaymentForm.css";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="payment-container">
      <h2 className="section-title">Payment</h2>

      <div className="payment-options">
        <div
          className={`option-card ${paymentMethod === "card" ? "selected" : ""}`}
          onClick={() => setPaymentMethod("card")}
        >
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            readOnly
          />
          <div className="option-info">
            <span className="option-label">Credit/Debit Card</span>
            <div className="card-logos">
              <img src="/visa.png" alt="Visa" />
              <img src="/mastercard.png" alt="Mastercard" />
              <img src="/amex.png" alt="Amex" />
            </div>
          </div>
        </div>

        <div
          className={`option-card ${paymentMethod === "klarna" ? "selected" : ""}`}
          onClick={() => setPaymentMethod("klarna")}
        >
          <input
            type="radio"
            value="klarna"
            checked={paymentMethod === "klarna"}
            readOnly
          />
          <div className="option-info">
            <span className="option-label">Klarna</span>
            <img src="/klarna-logo.png" alt="Klarna" className="klarna-logo" />
          </div>
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="form-section">
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" placeholder="CVC" />
            </div>
          </div>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="Full name" />
          </div>
        </div>
      )}

      {paymentMethod === "klarna" && (
        <div className="form-section info-box">
          <p>
            You’ll be redirected to <strong>Klarna</strong> for secure checkout after placing your order.
          </p>
        </div>
      )}

      <div className="form-section checkbox">
        <label>
          <input type="checkbox" defaultChecked /> Same as delivery address
        </label>
      </div>

      <button className="submit-button">Review & Place Order</button>
    </div>
  );
};

export default PaymentForm;

