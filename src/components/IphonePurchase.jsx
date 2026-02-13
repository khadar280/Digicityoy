// src/pages/IphonePurchase.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [model, setModel] = useState("iphone17_pro_max");
  const [storage, setStorage] = useState(128);
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });

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
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price) return alert(t("purchase.alertCalculatePrice"));

    alert(`
${t("purchase.orderSubmitted")}!

${t("purchase.name")}: ${customer.name}
${t("purchase.model")}: ${currentModel.label}
${t("purchase.storage")}: ${storage} GB
${t("purchase.condition")}: ${t(`purchase.condition.${condition}`)}
${t("purchase.total")}: €${price}
    `);
  };

  return (
    <div className="purchase-page">
      {/* Back to homepage or previous page */}
      <button className="back-btn" onClick={() => navigate("/")}>← {t("back")}</button>

      <h2>{t("purchase.title")}</h2>

      {/* Model Selection */}
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

      {/* Storage Selection */}
      <label>{t("purchase.selectStorage")}</label>
      <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
        {currentModel.storage.map(s => <option key={s} value={s}>{s} GB</option>)}
      </select>

      {/* Condition Selection */}
      <label>{t("purchase.selectCondition")}</label>
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="excellent">{t("purchase.condition.excellent")}</option>
        <option value="good">{t("purchase.condition.good")}</option>
        <option value="fair">{t("purchase.condition.fair")}</option>
        <option value="poor">{t("purchase.condition.poor")}</option>
      </select>

      <button className="calculate-btn" onClick={calculatePrice}>{t("purchase.showPrice")}</button>

      {price && (
        <>
          <div className="purchase-summary">
            <h3>{t("purchase.total")}: €{price}</h3>
          </div>

          {/* Customer Info Form */}
          <form className="customer-form" onSubmit={handleSubmit}>
            <h3>{t("purchase.customerInfo")}</h3>
            <input name="name" placeholder={t("purchase.name")} value={customer.name} onChange={handleChange} required />
            <input name="email" placeholder={t("purchase.email")} type="email" value={customer.email} onChange={handleChange} required />
            <input name="phone" placeholder={t("purchase.phone")} value={customer.phone} onChange={handleChange} required />
            <textarea name="address" placeholder={t("purchase.address")} value={customer.address} onChange={handleChange} required />
            <button type="submit" className="buy-btn">{t("purchase.submitOrder")}</button>
          </form>
        </>
      )}
    </div>
  );
}
