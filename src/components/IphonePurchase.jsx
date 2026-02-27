// src/components/IphonePurchase.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./IphonePurchase.css"; 

const IPHONE_MODELS = [
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max", storage: [256,512, 1024,2048] },
  { label: "iPhone 17 Pro", value: "iphone17_pro", storage: [ 256, 512, 1024] },
  { label: "iPhone 17", value: "iphone17", storage: [256, 512, 1024] },
    { label: "iPhone 17 Air", value: "iphone17_Air", storage: [256, 512, 1024] },
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max", storage: [256,128,512] },
  { label: "iPhone 16 Pro", value: "iphone16_pro", storage: [128, 256,512,1024] },
   { label: "iPhone 16 Plus", value: "iphone16_plus", storage: [256,128,512] },
  { label: "iPhone 16e", value: "iphone16e", storage: [256,128,512] },
   { label: "iPhone 16 ", value: "iphone16", storage: [256,128,512] },
  
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max", storage: [ 256,512,1024] },
  { label: "iPhone 15 Pro", value: "iphone15_pro", storage: [128, 256,512,1024] },
   { label: "iPhone 15 plus", value: "iphone15_Plus", storage: [128, 256, 512] },
  { label: "iPhone 15", value: "iphone15", storage: [128,556,512] },
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max", storage: [128, 256,512,1024] },
  { label: "iPhone 14 Pro", value: "iphone14_pro", storage: [128, 256,512,1024] },
    { label: "iPhone 14 Plus", value: "iphone14_Plus", storage: [128, 256,512] },
  { label: "iPhone 14", value: "iphone14", storage: [128, 256] },
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max", storage: [128, 256,512,1024] },
  { label: "iPhone 13 Pro", value: "iphone13_pro", storage: [128, 256,512,1024] },
  { label: "iPhone 13", value: "iphone13", storage: [128, 256,512] },
   { label: "iPhone 13 mini", value: "iphone13 mini", storage: [64,128, 256] },
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max", storage: [64, 128, 256] },
  { label: "iPhone 12 Pro", value: "iphone12_pro", storage: [64, 128] },
  { label: "iPhone 12", value: "iphone12", storage: [64, 128, 256] },
    { label: "iPhone 12 mini", value: "iphone12 mini", storage: [64, 128, 256] },
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max", storage: [64, 128, 256] },
  { label: "iPhone 11 Pro", value: "iphone11_pro", storage: [64, 128] },
  { label: "iPhone 11", value: "iphone11", storage: [64, 128, 256] }
];

const BASE_PRICES = {
  iphone17_pro_max: 950, iphone17_pro: 880, iphone17: 850,
  iphone16_pro_max: 820, iphone16_pro: 780, iphone16: 750,
  iphone15_pro_max: 720, iphone15_pro: 680, iphone15: 650,
  iphone14_pro_max: 500, iphone14_pro: 480, iphone14: 470,
  iphone13_pro_max: 420, iphone13_pro: 410, iphone13: 400,
  iphone12_pro_max: 300, iphone12_pro: 290, iphone12: 280,
  iphone11_pro_max: 260, iphone11_pro: 255, iphone11: 250
};

// Use backend URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || "https://digicityoy-223.onrender.com";

export default function IphonePurchase() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialModel = params.get("model") 
    ? IPHONE_MODELS.find(m => m.label === params.get("model"))?.value 
    : "iphone17_pro_max";

  const [model, setModel] = useState(initialModel);
  const [storage, setStorage] = useState(IPHONE_MODELS.find(m => m.value === initialModel)?.storage[0] || 128);
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) return alert(t("purchase.alertCalculatePrice"));

    const orderData = {
      model: currentModel.label,
      storage,
      condition,
      price,
      customer
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert(t("purchase.orderSuccess"));
        navigate("/thank-you");
      } else {
        alert(result.message || t("purchase.orderFailed"));
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(t("purchase.orderFailed"));
    }
  };

  return (
    <div className="calculator">
      <h2>{t("purchase.title")}</h2>

      <div className="step">
        <label>{t("purchase.selectModel")}</label>
        <select
          value={model}
          onChange={(e) => {
            const selected = e.target.value;
            setModel(selected);
            setStorage(IPHONE_MODELS.find(m => m.value === selected).storage[0]);
          }}
        >
          {IPHONE_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
      </div>

      <div className="step">
        <label>{t("purchase.selectStorage")}</label>
        <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
          {currentModel.storage.map(s => <option key={s} value={s}>{s} GB</option>)}
        </select>
      </div>

      <div className="step">
        <label>{t("purchase.selectCondition")}</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="excellent">{t("purchase.condition.excellent")}</option>
          <option value="good">{t("purchase.condition.good")}</option>
          <option value="fair">{t("purchase.condition.fair")}</option>
          <option value="poor">{t("purchase.condition.poor")}</option>
        </select>
      </div>

      <button className="price-btn" onClick={calculatePrice}>{t("purchase.showPrice")}</button>

      {price && (
        <div className="result">
          <p>{t("purchase.total")}: €{price}</p>
          <form className="customer-form" onSubmit={handleSubmit}>
            <input name="name" placeholder={t("purchase.name")} value={customer.name} onChange={handleChange} required />
            <input name="email" placeholder={t("purchase.email")} type="email" value={customer.email} onChange={handleChange} required />
            <input name="phone" placeholder={t("purchase.phone")} value={customer.phone} onChange={handleChange} required />
            <textarea name="address" placeholder={t("purchase.address")} value={customer.address} onChange={handleChange} required />
            <button type="submit" className="buy-btn" disabled={loading}>
              {loading ? t("purchase.submitting") : t("purchase.submitOrder")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}