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
  <div className="repair-form">

    <input
      name="name"
      placeholder={t("Full Name")}
      onChange={handleChange}
    />

    <input
      name="phone"
      placeholder={t("Phone Number")}
      onChange={handleChange}
    />

    <input
      name="email"
      placeholder={t("Email")}
      onChange={handleChange}
    />

    <select name="device" onChange={handleChange}>
      <option value="">{t("Select Device")}</option>
      <option value="iPhone">iPhone</option>
      <option value="Android">Android</option>
      <option value="Tablet">Tablet</option>
      <option value="Laptop">Laptop</option>
    </select>

    <textarea
      name="issue"
      placeholder={t("Describe your issue")}
      onChange={handleChange}
    />

    <input
      name="address"
      placeholder={t("Address")}
      onChange={handleChange}
    />

    <input
      name="postcode"
      placeholder={t("Post Code")}
      onChange={handleChange}
    />

    <input
      name="city"
      placeholder={t("City")}
      onChange={handleChange}
    />

    <button type="submit">
      {t("Submit Request")}
    </button>

  </div>
);