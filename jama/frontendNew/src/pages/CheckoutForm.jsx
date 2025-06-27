import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    post: '',
    city: '',
    country: '',

    deliveryMethod: 'standard',
  });

  const deliveryCosts = {
    standard: 4.99,
    express: 19.9,
    pickup: 0,
  };

  const itemsTotal = cartItems.reduce((total, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + numeric;
  }, 0);

  const deliveryFee = deliveryCosts[form.deliveryMethod] || 0;
  const totalPrice = itemsTotal + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price.replace(/[^\d.]/g, ''),
        quantity: item.quantity || 1,
      })),
      total: totalPrice.toFixed(2),
      deliveryMethod: form.deliveryMethod,
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        post: form.post,
        city: form.city,
        country: form.country,
      },
    };

   const API_URL = process.env.REACT_APP_API_URL || 'https://en.digicity.fi';
    const response = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Failed to initiate payment session');
      console.error('❌ Stripe error:', data);
    }
  } catch (error) {
    console.error('🚨 Submit error:', error);
    alert('Something went wrong. Please try again.');
  }
};



  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="checkout-summary">
          <h4>Order Summary</h4>
          {cartItems.map((item, i) => (
            <div key={i} className="checkout-item">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
          <hr />
          <p>Delivery: <strong>{deliveryFee.toFixed(2)} €</strong></p>
          <p className="total">Total: <strong>{totalPrice.toFixed(2)} €</strong></p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h4>Billing Info</h4>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required></textarea>
          <input type="text" name="post" placeholder="Post Code" value={form.post} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required />

          <h4>Delivery Method</h4>
          <label>
            <input
              type="radio"
              name="deliveryMethod"
              value="standard"
              checked={form.deliveryMethod === 'standard'}
              onChange={handleChange}
            />
            Standard (4.99 €)
          </label>
          <label>
            <input
              type="radio"
              name="deliveryMethod"
              value="express"
              checked={form.deliveryMethod === 'express'}
              onChange={handleChange}
            />
            Express (19.90 €)
          </label>
          <label>
            <input
              type="radio"
              name="deliveryMethod"
              value="pickup"
              checked={form.deliveryMethod === 'pickup'}
              onChange={handleChange}
            />
            Pickup (Free)
          </label>

      
          <button type="submit">Confirm Payment</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
