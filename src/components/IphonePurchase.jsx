import React, { useState } from "react";
import "./IphonePurchase.css";

const IPHONE_MODELS = [
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max", storage: [128, 256, 512, 1024] },
  { label: "iPhone 17 Pro", value: "iphone17_pro", storage: [128, 256, 512] },
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 14", value: "iphone14", storage: [128, 256] },
  { label: "iPhone 13", value: "iphone13", storage: [128, 256] },
  { label: "iPhone 12", value: "iphone12", storage: [64, 128, 256] },
  { label: "iPhone 11", value: "iphone11", storage: [64, 128, 256] }
];

const BASE_PRICES = {
  iphone17_pro_max: 950,
  iphone17_pro: 880,
  iphone16_pro_max: 850,
  iphone15_pro_max: 720,
  iphone14: 470,
  iphone13: 400,
  iphone12: 280,
  iphone11: 250
};

export default function IphonePurchase() {
  const [model, setModel] = useState("iphone17_pro_max");
  const [storage, setStorage] = useState(128);
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const currentModel = IPHONE_MODELS.find(m => m.value === model);

  const calculatePrice = () => {
    let total = BASE_PRICES[model] || 0;

    if (storage === 256) total += 50;
    if (storage === 512) total += 100;
    if (storage === 1024) total += 150;

    if (condition === "excellent") total += 100;
    if (condition === "fair") total -= 120;
    if (condition === "poor") total -= 200;

    setPrice(total);
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price) {
      alert("Please calculate price first.");
      return;
    }

    // Here later you connect backend
    alert(`
Order Submitted!

Name: ${customer.name}
Model: ${currentModel.label}
Storage: ${storage}GB
Condition: ${condition}
Total: €${price}
    `);
  };

  return (
    <div className="purchase">
      <h2>Buy Used iPhone</h2>

      <label>Select Model</label>
      <select
        value={model}
        onChange={(e) => {
          const selected = e.target.value;
          setModel(selected);
          const firstStorage = IPHONE_MODELS.find(m => m.value === selected).storage[0];
          setStorage(firstStorage);
        }}
      >
        {IPHONE_MODELS.map(m => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>

      <label>Select Storage</label>
      <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
        {currentModel.storage.map(s => (
          <option key={s} value={s}>{s} GB</option>
        ))}
      </select>

      <label>Select Condition</label>
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="excellent">Excellent (Like New)</option>
        <option value="good">Good</option>
        <option value="fair">Fair (Visible Wear)</option>
        <option value="poor">Poor (Heavy Damage)</option>
      </select>

      <button className="calculate-btn" onClick={calculatePrice}>
        Show Price
      </button>

      {price && (
        <>
          <div className="purchase-summary">
            <h3>Total Price: €{price}</h3>
          </div>

          {/* CUSTOMER FORM */}
          <form className="customer-form" onSubmit={handleSubmit}>
            <h3>Customer Information</h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Shipping Address"
              value={customer.address}
              onChange={handleChange}
              required
            />

            <button type="submit" className="buy-btn">
              Submit Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
