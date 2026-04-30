import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./RepairOrderForm.css";

export default function RepairOrderForm({ onClose }) {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    issue: "",
    address: "",
    postcode: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://digicityoy-223.onrender.com";

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/homerepair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lang: i18n.language,
        }),
      });

      setLoading(false);

      if (res.ok) {
        alert("Request sent!");
        onClose?.();

        // reset form
        setForm({
          name: "",
          phone: "",
          email: "",
          device: "",
          issue: "",
          address: "",
          postcode: "",
          city: "",
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">

        <h2>{t("homeRepair.title")}</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={form.name}
            placeholder={t("homeRepair.fullName")}
            onChange={handleChange}
          />

          <input
            name="phone"
            value={form.phone}
            placeholder={t("homeRepair.phone")}
            onChange={handleChange}
          />

          <input
            name="email"
            value={form.email}
            placeholder={t("homeRepair.email")}
            onChange={handleChange}
          />

          <select
            name="device"
            value={form.device}
            onChange={handleChange}
          >
            <option value="">
              {t("homeRepair.selectDevice")}
            </option>
            <option value="iphone">
              {t("homeRepair.devices.iphone")}
            </option>
            <option value="android">
              {t("homeRepair.devices.android")}
            </option>
            <option value="tablet">
              {t("homeRepair.devices.tablet")}
            </option>
            <option value="laptop">
              {t("homeRepair.devices.laptop")}
            </option>
          </select>

          <textarea
            name="issue"
            value={form.issue}
            placeholder={t("homeRepair.issue")}
            onChange={handleChange}
          />

          <input
            name="address"
            value={form.address}
            placeholder={t("homeRepair.address")}
            onChange={handleChange}
          />

          <input
            name="postcode"
            value={form.postcode}
            placeholder={t("homeRepair.postcode")}
            onChange={handleChange}
          />

          <input
            name="city"
            value={form.city}
            placeholder={t("homeRepair.city")}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? t("homeRepair.sending")
              : t("homeRepair.submit")}
          </button>

        </form>

        <button onClick={onClose}>
          {t("homeRepair.cancel")}
        </button>

      </div>
    </div>
  );
}