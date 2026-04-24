import { useState } from "react";
import "./RepairOrderForm.css";
import { useTranslation } from "react-i18next";

export default function RepairAtHome({ onClose }) {
  const { t } = useTranslation();

  const HOME_FEE = 50;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    service: "home",
    device: "iPhone",
    issue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalPrice = form.service === "home" ? HOME_FEE : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://digicityoy-223.onrender.com";

    const orderData = {
      type: "home_repair",
      total: totalPrice,
      ...form,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert(t("repair.success"));
        onClose?.();
      } else {
        alert(t("repair.error"));
      }
    } catch (error) {
      console.error(error);
      alert(t("repair.serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>{t("repair.title")}</h2>

        <form onSubmit={handleSubmit} className="form">

          <input
            name="name"
            placeholder={t("repair.name")}
            required
            onChange={handleChange}
          />

          <input
            name="phone"
            type="tel"
            placeholder={t("repair.phone")}
            required
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder={t("repair.email")}
            onChange={handleChange}
          />

          <textarea
            name="issue"
            placeholder={t("repair.issue")}
            required
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder={t("repair.address")}
            required
            onChange={handleChange}
          />

          <input
            name="postcode"
            placeholder={t("repair.postcode")}
            required
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder={t("repair.city")}
            required
            onChange={handleChange}
          />

          <div className="button-group">
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? t("repair.sending") : t("repair.submit")}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              {t("repair.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}