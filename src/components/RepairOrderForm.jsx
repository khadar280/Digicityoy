import { useState } from "react";
import "./RepairOrderForm.css";
import { useTranslation } from "react-i18next";

export default function RepairAtHome() {
  const HOME_FEE = 50;
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    service: "home",
    device: "",
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
        setForm({
          name: "",
          phone: "",
          email: "",
          address: "",
          postcode: "",
          city: "",
          service: "home",
          device: "",
          issue: "",
        });
      } else {
        alert(t("repair.error"));
      }
    } catch (err) {
      console.error(err);
      alert(t("repair.serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="repair-page">
      <div className="repair-container">

        <h2>{t("repair.title")}</h2>

        <form onSubmit={handleSubmit} className="repair-form">

          <input
            name="name"
            placeholder={t("repair.fullName")}
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

          <select name="device" onChange={handleChange} required>
            <option value="">{t("repair.selectDevice")}</option>
            <option value="iPhone">iPhone</option>
            <option value="Android">Android</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
          </select>

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

          <select name="service" onChange={handleChange}>
            <option value="home">
              {t("repair.homeVisit")} (+€50)
            </option>
            <option value="shop">
              {t("repair.shop")}
            </option>
          </select>

          <div className="price-box">
            <p>
              {t("repair.fee")}: €{totalPrice}
            </p>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? t("repair.sending") : t("repair.submit")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}